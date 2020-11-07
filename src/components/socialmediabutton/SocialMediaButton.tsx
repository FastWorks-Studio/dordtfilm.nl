import React from 'react';
import './SocialMediaButton.css';
import * as Utility from '../../utility/module';
import * as Models from '../../models/module';

type Props = {
  title: string
  icon: string
  action: string | Function
}

export class SocialMediaButton extends React.Component<Props> {

  div: React.RefObject<HTMLDivElement> = React.createRef();
  button: React.RefObject<HTMLButtonElement> = React.createRef();
  img: React.RefObject<HTMLImageElement> = React.createRef();

  render() {
    return (
      <>
      <div ref={this.div} className="socialmediabutton-container" >
        <button className='socialmediabutton-button' ref={this.button} onClick={this.didTapCallToAction.bind(this)}>
          <img className="socialmediabutton-icon" ref={this.img} src={`./icons/${this.props.icon}`} />
          {this.props.title}
        </button>
      </div>
      </>
    );
  }

  didTapCallToAction() {
    const url = this.props.action as string
    if (url) { window.open(url, "_blank"); return; }
    
    const action = this.props.action as Function
    if (action) { return action(); }
  }

  prepareForAnimation() {
    const div = this.div?.current;
    if (div !== null && div !== undefined) { div.style.opacity = `0`; }
  }

  animateIn(args?: { delay?: number }) {
    Utility.Animator.animate(this.button.current, {
      from: Models.Transform.identity
        .opacity({ amount: 0 })
        .translated({ x: -30 }),
      duration: 2,
      delay: args?.delay,
      curve: Models.AnimationCurve.spring()
    })
    Utility.Animator.animate(this.img.current, {
      from: Models.Transform.identity
        .opacity({ amount: 0 })
        .translated({ x: -10 })
        .rotated({ amount: -15 }),
      duration: 1.5,
      delay: args?.delay,
      curve: Models.AnimationCurve.spring()
    })
  }
}

export default SocialMediaButton;
