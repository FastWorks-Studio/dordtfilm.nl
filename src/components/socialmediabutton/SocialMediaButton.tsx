import React from 'react';
import './SocialMediaButton.css';
import * as Utility from '../../utility/module';
import * as Models from '../../models/module';
import * as UI from '../module';

type Props = {
  title: string
  icon: string
  iconAlt: string
  action: string | Function
}

export class SocialMediaButton extends React.Component<Props> implements UI.Animatable {

  button: React.RefObject<HTMLButtonElement> = React.createRef();
  img: React.RefObject<HTMLImageElement> = React.createRef();

  render() {
    return (
      <button className='socialmediabutton-button' ref={this.button} onClick={this.didTapCallToAction.bind(this)}>
        <img className="socialmediabutton-icon" ref={this.img} alt={this.props.iconAlt} src={`./icons/${this.props.icon}`} />
        {this.props.title}
      </button>
    );
  }

  didTapCallToAction() {
    const url = this.props.action as string
    if (url) { window.open(url, "_blank"); return; }
    
    const action = this.props.action as Function
    if (action) { return action(); }
  }

  prepareForAnimation() {
    const button = this.button?.current;
    if (button !== null && button !== undefined) { button.style.opacity = `0`; }
    const img = this.img?.current;
    if (img !== null && img !== undefined) { img.style.opacity = `0`; }
  }

  animateIn(args?: { delay?: number }) {
    Utility.Animator.animate(this.button.current, {
      from: Models.Transform.identity
        .opacity({ amount: 0 })
        .blurred({ amount: 5 })
        .translated({ x: -130 }),
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
