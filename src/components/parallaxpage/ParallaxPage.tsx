import React from 'react';
import './ParallaxPage.css';
import { setInterval } from 'timers';
import * as Utility from '../../utility/module';
import * as UI from '../module';
import * as Models from '../../models/module';

type Props = { 
  image?: string
  video?: string
  blurBackground?: boolean
  blurContent?: boolean
  loadingColor?: string
  focalDim?: number
  animateEntry?: boolean
  onDidLoadBackground?: (element: UI.ParallaxPage) => void
}

export class ParallaxPage extends React.Component<Props> {

  private page: React.RefObject<HTMLDivElement> = React.createRef();
  private background: React.RefObject<HTMLDivElement> = React.createRef();
  private backgroundImage: React.RefObject<HTMLDivElement> = React.createRef();
  private dim: React.RefObject<HTMLDivElement> = React.createRef();
  private content: React.RefObject<HTMLDivElement> = React.createRef();

  private backgroundBlurRadius: number = 69;
  private contentBlurRadius: number = 69;
  private contentOpacity: number = 69;
  private dimOpacity: number = 69;

  private focalArea: number = 0.1;
  private backgroundBlurIntensity: number = 1;
  private contentBlurIntensity: number = 2;
  private focalTransitionSize: number = 0.5;
  private focalDim: number = 0.3;
  private doParallax: boolean = true;
  private parallaxIntensity: number = 0.5;
  private parallaxOffset: Utility.InertialNumber = new Utility.InertialNumber({ acceleration: 4, inertia: 0.7 });

  private initialBackgroundScale: number = 1.1;

  private focusUpdateIntervalMs: number = 1000 / 24

  render() {
    return (
      <div className="parallax-page" ref={this.page}>
        <div className='parallax-page-background-container' ref={this.background} style={{backgroundColor: this.props.loadingColor || "#333333"}}>
          <div className="parallax-page-background-image" aria-hidden="true" ref={this.backgroundImage} />
          {this.props.video && (<UI.Player video={`${this.props.video}`} />)}
        </div>
        <div className="parallax-page-background-dim" ref={this.dim}/>
        <div className="parallax-page-content-container" ref={this.content}>
          {this.props.children}
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.focalDim !== undefined) { this.focalDim = this.props.focalDim; }
    this.doParallax = !!this.page.current?.offsetParent;
    if (this.doParallax === true) { 
      setInterval(this.updateFocus.bind(this), this.focusUpdateIntervalMs);
      window.addEventListener("scroll", this.updateParallax.bind(this));
      this.updateParallax();
    }
    this.loadBackgroundImage(this.props.image);
  }

  private loadBackgroundImage(url?: string) {
    if (url === undefined || url === null) { return; }
    const imageUrl = `./images/${this.props.image}`;
    let preloaderImg: HTMLImageElement | null = document.createElement("img");
    preloaderImg.style.opacity = `0`;
    preloaderImg.src = imageUrl;

    const context = this
    preloaderImg.addEventListener('load', (event) => {
      const backgroundImage = context.backgroundImage.current;
      if (backgroundImage === undefined || backgroundImage === null) { return; }
      backgroundImage.style.backgroundImage = `url("${imageUrl}")`;
      preloaderImg = null;
      if (context.props.animateEntry || false) {
        Utility.Animator.animate(this.background.current, {
          from: Models.Transform.identity
            .opacity({ amount: 0 })
            .scaled({ amount: 1.1 }),
          duration: 2,
          curve: Models.AnimationCurve.easeOut
        });
      }
      if (context.props.onDidLoadBackground !== null && context.props.onDidLoadBackground !== undefined) {
        context.props.onDidLoadBackground(context);
      }
    });
  }

  private getOffsetInViewPort(): number {
    const page = this.page.current as HTMLElement;
    if (page === undefined) { return 0; }
    const rect: DOMRect = page.getBoundingClientRect();
    return this.clamped(rect.y / rect.height, { min: -1, max: 1 });
  }

  private updateParallax() {
    if (this.isInViewport() === false || this.doParallax === false) { return; }
    const offset = this.getOffsetInViewPort();
    this.updateParallaxOffset(offset);
  }

  private updateFocus(): void {
    this.adjustPerformance();
    if (this.isInViewport() === false) { return; }
    const offset = this.getOffsetInViewPort();
    const absOffset: number = Math.max(0, Math.abs(offset) - this.focalArea);
    const contentOpacity = Math.max(0, 1 - (absOffset * (1 / this.focalTransitionSize)));
    this.updateContentOpacity(contentOpacity)
    this.updateDimValue(contentOpacity);
    if (contentOpacity !== 0) {
      this.updateContentBlurRadius(absOffset);
    }
    this.updateBackgroundBlurRadius(absOffset);
  }

  private updateContentBlurRadius(offset: number) {
    const content = this.content.current as HTMLElement;
    if (content === undefined || (this.props.blurContent !== true)) { return; }
    const contentBlurRadius = offset * 20 * this.contentBlurIntensity;
    if (Math.abs(contentBlurRadius - this.contentBlurRadius) < 0.1) { return; }
    this.contentBlurRadius = contentBlurRadius;
    if (Math.abs(contentBlurRadius) < 0.1) {
      content.style.filter = ``;
    } else {
      content.style.filter = `blur(${contentBlurRadius}px)`;
    }
  }

  private updateBackgroundBlurRadius(offset: number) {
    let background = this.background.current as HTMLElement;
    if (background === undefined) { return; }
    const backgroundBlurRadius = (1 - Math.min(1, offset * (1 / this.focalTransitionSize))) * 3 * this.backgroundBlurIntensity;
    if (Math.abs(backgroundBlurRadius - this.backgroundBlurRadius) < 0.1) { return; }
    this.backgroundBlurRadius = backgroundBlurRadius;
    if (Math.abs(backgroundBlurRadius) < 0.1) {
      background.style.filter = ``;
    } else {
      if (this.props.blurBackground !== false) {
        background.style.filter = `blur(${backgroundBlurRadius}px)`;
      } else {
        background.style.filter = ``;
      }
    }
  }

  private updateDimValue(value: number) {
    const dim = this.dim.current as HTMLElement;
    if (dim === undefined) { return; }
    const dimValue = value * this.focalDim;
    if (dimValue === this.dimOpacity) { return; }
    this.dimOpacity = dimValue;
    dim.style.opacity = `${dimValue}`
  }

  private updateContentOpacity(value: number) {
    const content = this.content.current as HTMLElement;
    if (content === undefined) { return; }
    const contentOpacity = parseFloat(value.toFixed(2));
    if (contentOpacity === this.contentOpacity) { return; }
    content.style.opacity = `${contentOpacity}`
  }

  private updateParallaxOffset(offset: number) {
    const background = this.background.current as HTMLElement;
    if (background === undefined) { return; }
    const parallaxIntensity: number = window.innerHeight * this.parallaxIntensity;
    const targetOffset = offset * -parallaxIntensity;
    let parallaxOffset: number;
    if (Utility.ClientInfo.isMobile) {
      this.parallaxOffset.target = targetOffset;
      this.parallaxOffset.update(0.02);
      parallaxOffset = this.parallaxOffset.current;
    } else {
      parallaxOffset = targetOffset;
    }
    background.style.transform = `translate3d(0px, ${parallaxOffset}px, 0px)`
  }

  private isInViewport(): boolean {
    const rect = this.page.current?.getBoundingClientRect();
    if (rect) {
      return rect.y >= -(rect.height * 1.3) && rect.y <= (rect.height * 1.3);
    } else { 
      return false;
    }
  }

  private clamped(value: number, range: { min: number, max: number }): number {
    return Math.max(range.min, Math.min(range.max, value));
  }

  private consecutiveSlowUpdates: number = 0;
  private previousUpdate: number = 0;
  private lastDecreaseIndex: number = 0;
  private adjustPerformance() {
    let date = Date.now();
    let updateRate = date - this.previousUpdate;
    this.previousUpdate = date;
    let actualToDesiredRatio = updateRate / this.focusUpdateIntervalMs;
    if (actualToDesiredRatio > 1.3) { 
      this.consecutiveSlowUpdates += 1; 
    } else {
      this.consecutiveSlowUpdates = Math.max(0, this.consecutiveSlowUpdates - 1);
    }
    if ((this.consecutiveSlowUpdates - this.lastDecreaseIndex) > 3) {
      this.backgroundBlurIntensity = Math.max(0, this.backgroundBlurIntensity - 0.1);
      this.contentBlurIntensity = Math.max(0, this.contentBlurIntensity - 0.1);
      this.lastDecreaseIndex = this.consecutiveSlowUpdates;
    } else if (this.consecutiveSlowUpdates > 10) {
      this.disableParallax();
    }
  }
  
  private disableParallax() {
    let background = this.background.current as HTMLElement;
    if (background === undefined || background === null) { return; }
    background.style.transform = ``;
    this.doParallax = false
  }
}

export default ParallaxPage;