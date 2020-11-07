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
  loopVideo?: boolean
  backgroundXOffset?: number
  onDidLoadBackground?: (element: UI.ParallaxPage) => void
}

enum VisibilityLevel {
  notVisible,
  singlePixel,
  barely,
}

export class ParallaxPage extends React.Component<Props> {

  private page: React.RefObject<HTMLDivElement> = React.createRef();
  private backgroundContainer: React.RefObject<HTMLDivElement> = React.createRef();
  private backgroundEntryContainer: React.RefObject<HTMLDivElement> = React.createRef();
  private backgroundImage: React.RefObject<HTMLDivElement> = React.createRef();
  private dim: React.RefObject<HTMLDivElement> = React.createRef();
  private content: React.RefObject<HTMLDivElement> = React.createRef();
  private player: React.RefObject<UI.Player> = React.createRef();

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
  
  private visibilityLevel: VisibilityLevel = VisibilityLevel.notVisible;

  private focusUpdateIntervalMs: number = 1000 / 24

  get autoplay(): boolean {
    if (this.props.loopVideo !== undefined && this.props.loopVideo !== null) {
      return this.props.loopVideo;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div className="parallax-page" ref={this.page}>
        <div className='parallax-page-background-container' ref={this.backgroundContainer} style={{backgroundColor: this.props.loadingColor || "#333333"}}>
          <div className="parallax-page-background-image" aria-hidden="true" ref={this.backgroundImage} />
          {this.props.video && (<UI.Player ref={this.player}video={`${this.props.video}`} loopVideo={this.props.loopVideo} autoplay={this.autoplay} xOffset={this.props.backgroundXOffset} />)}
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
    window.addEventListener("scroll", this.checkIfOnScreen.bind(this));
    this.checkIfOnScreen();
    if (this.doParallax === true) { 
      setInterval(this.updateFocus.bind(this), this.focusUpdateIntervalMs);
      window.addEventListener("scroll", this.updateParallax.bind(this));
      this.updateParallax();
    }
    this.loadBackgroundImage(this.props.image);
  }

  private checkIfOnScreen() {
    if (this.isInViewport(0.8)) {
      this.handleVisibilityLevel(VisibilityLevel.barely);
    } else if (this.isInViewport(0.99)) {
      this.handleVisibilityLevel(VisibilityLevel.singlePixel);
    } else {
      this.handleVisibilityLevel(VisibilityLevel.notVisible);
    }
  }

  private handleVisibilityLevel(visibilityLevel: VisibilityLevel) {
    if (this.visibilityLevel === visibilityLevel) { return; }
    this.visibilityLevel = visibilityLevel;
    const player = this.player.current;
    if (player !== null && player !== undefined && this.autoplay === false) {
      switch (this.visibilityLevel) {
        case VisibilityLevel.notVisible:
          player.stop(); break;
        case VisibilityLevel.singlePixel:
          player.rewind(); break;
        case VisibilityLevel.barely:
          player.play();
      }
    }
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
      const rect = this.page.current?.getBoundingClientRect();
      const backgroundXOffset = this.props.backgroundXOffset;
      if (preloaderImg !== null && rect !== null && rect !== undefined && backgroundXOffset !== null && backgroundXOffset !== undefined) {
        let parentAspect = rect.width / rect.height;
        let imageAspect = preloaderImg.naturalWidth / preloaderImg.naturalHeight;
        const overshoot = (imageAspect / parentAspect) - 1;
        backgroundImage.style.width = `${(imageAspect * 100).toFixed(0)}vh`
        backgroundImage.style.transform = `translate3d(${overshoot * backgroundXOffset * 50}vw, 0vw, 0vw)`;
      }
      preloaderImg = null;
      const container = context.backgroundContainer.current;
      if (context.props.animateEntry || false) {
        if (container === undefined || container === null) { return; }
        container.style.opacity = '0';
        setTimeout(function() { 
          Utility.Animator.animate(container, {
            from: Models.Transform.identity
              .opacity({ amount: 0 })
              .rotated({ amount: 10 })
              .blurred({ amount: 2 })
              .scaled({ amount: 1.5 }),
            duration: 7,
            curve: Models.AnimationCurve.easeOut
          });
        }, 200);
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
    if (this.isInViewport(1.2) === false || this.doParallax === false) { return; }
    const offset = this.getOffsetInViewPort();
    this.updateParallaxOffset(offset);
  }

  private updateFocus(): void {
    this.adjustPerformance();
    if (this.isInViewport(1.2) === false) { return; }
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
    if (content === undefined || this.props.blurContent !== true) { return; }
    const contentBlurRadius = offset * 2 * this.contentBlurIntensity;
    if (Math.abs(contentBlurRadius - this.contentBlurRadius) < 0.1) { return; }
    this.contentBlurRadius = contentBlurRadius;
    if (Math.abs(contentBlurRadius) < 0.1) {
      content.style.filter = ``;
    } else {
      content.style.filter = `blur(${contentBlurRadius}vmax)`;
    }
  }

  private updateBackgroundBlurRadius(offset: number) {
    let background = this.backgroundContainer.current as HTMLElement;
    if (background === undefined || this.props.blurBackground !== true) { return; }
    const backgroundBlurRadius = (1 - Math.min(1, offset * (1 / this.focalTransitionSize))) * 0.3 * this.backgroundBlurIntensity;
    if (Math.abs(backgroundBlurRadius - this.backgroundBlurRadius) < 0.1) { return; }
    this.backgroundBlurRadius = backgroundBlurRadius;
    if (Math.abs(backgroundBlurRadius) < 0.1) {
      background.style.filter = ``;
    } else {
      background.style.filter = `blur(${backgroundBlurRadius}vmax)`;
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
    const background = this.backgroundContainer.current as HTMLElement;
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

  private isInViewport(sizeMultiplier: number): boolean {
    const rect = this.page.current?.getBoundingClientRect();
    if (rect) {
      return rect.y >= -(rect.height * sizeMultiplier) && rect.y <= (rect.height * sizeMultiplier);
    } else { 
      return false;
    }
  }

  private clamped(value: number, range: { min: number, max: number }): number {
    return Math.max(range.min, Math.min(range.max, value));
  }

  private enableSlowMode: boolean = false;
  private consecutiveModeSwitchUpdates: number = 0;
  private previousUpdate: number = 0;
  private adjustPerformance() {
    let date = Date.now();
    let updateRate = date - this.previousUpdate;
    this.previousUpdate = date;
    let actualToDesiredRatio = updateRate / this.focusUpdateIntervalMs;
    if (this.enableSlowMode === false && actualToDesiredRatio > 1.3) { 
      this.consecutiveModeSwitchUpdates += 1;
    } else if (this.enableSlowMode === true && actualToDesiredRatio < 1.1) {
      this.consecutiveModeSwitchUpdates += 1;
    } else {
      this.consecutiveModeSwitchUpdates = Math.max(0, this.consecutiveModeSwitchUpdates - 1);
    }
    if (this.consecutiveModeSwitchUpdates > 10) {
      this.switchSlowMode();
    }
  }
  
  private switchSlowMode() {
    this.enableSlowMode = !this.enableSlowMode;
    this.consecutiveModeSwitchUpdates = 0;
    if (this.enableSlowMode) {
      let background = this.backgroundContainer.current as HTMLElement;
      if (background === undefined || background === null) { return; }
      background.style.transform = ``;
      this.doParallax = false
    } else {
      this.doParallax = true;
    }
  }
}

export default ParallaxPage;