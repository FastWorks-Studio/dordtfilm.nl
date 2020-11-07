import React from 'react';
import './Logo.css';
import * as Utility from '../../utility/module';
import * as Models from '../../models/module';

type Props = { 
  title?: string
  subtitle?: string
}
export class Logo extends React.Component<Props> {

  title: React.RefObject<HTMLParagraphElement> = React.createRef();
  subtitle: React.RefObject<HTMLParagraphElement> = React.createRef();

  render() {
    return (
      <>
        <div className="logo">
          <p className="logo-title" ref={this.title}>{this.fallbackIfNull(this.props.title, "Dordrecht")}</p>
          <p className="logo-subtitle" ref={this.subtitle}>{this.fallbackIfNull(this.props.subtitle, "door de jaren heen")}</p>
        </div>
      </>
    );
  }

  fallbackIfNull(value?: string, fallback?: string) {
      if (!!value) { return value; }
      return fallback;
  }

  prepareForAnimation() {
    const title = this.title?.current;
    if (title !== null && title !== undefined) { title.style.opacity = `0`; }
    const subtitle = this.subtitle?.current;
    if (subtitle !== null && subtitle !== undefined) { subtitle.style.opacity = `0`; }
  }

  animateIn(args?: { delay?: number }) {
    Utility.Animator.animate(this.title.current, { 
      from: Models.Transform.identity
        .opacity({ amount: 0 })
        .translated({ x: 100 }),
        delay: args?.delay,
      duration: 3,
      curve: Models.AnimationCurve.spring()
    });
    Utility.Animator.animate(this.subtitle.current, { 
      from: Models.Transform.identity
        .opacity({ amount: 0 })
        .translated({ x: -60 }),
        delay: (args?.delay || 0) + 0.1,
      duration: 3,
      curve: Models.AnimationCurve.spring()
    });
  }
}

export default Logo;
