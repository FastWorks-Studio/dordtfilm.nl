import React from 'react';
import './IconButton.scss';
import * as Utility from '../../utility/module';
import * as Models from '../../models/module';
import * as UI from '../module';
import Spacer from '../spacer/Spacer';

type Props = {
  title: string
  icon: string
  iconAlt: string
  action: string | Function
  alignment?: IconButtonAlignment
}

export enum IconButtonAlignment {
  left,
  right
}

export class IconButton extends React.Component<Props> implements UI.Animatable {

  button: React.RefObject<HTMLButtonElement> = React.createRef();
  img: React.RefObject<HTMLImageElement> = React.createRef();

  get alignment(): IconButtonAlignment
   { return this.props.alignment === IconButtonAlignment.right 
    ? IconButtonAlignment.right 
    : IconButtonAlignment.left }

  render() {
    return (
      <button className='iconbutton-button' ref={this.button} onClick={this.didTapCallToAction.bind(this)}>
        {this.alignment === IconButtonAlignment.left || this.props.title}
        {this.alignment === IconButtonAlignment.left || (<Spacer size='calc(0.9vmin + 0.9vmax)' />)}
        <img className="iconbutton-icon" ref={this.img} alt={this.props.iconAlt} src={`./icons/${this.props.icon}`} />
        {this.alignment === IconButtonAlignment.right || (<Spacer size='calc(0.9vmin + 0.9vmax)' />)}
        {this.alignment === IconButtonAlignment.right || this.props.title}
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
