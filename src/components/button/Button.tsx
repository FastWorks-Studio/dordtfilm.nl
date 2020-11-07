import React from 'react';
import './Button.scss';
import * as Utility from '../../utility/module';
import * as Models from '../../models/module';

type Props = {
  title: string
  action: string | Function
  center?: boolean
}

export class Button extends React.Component<Props> {

  div: React.RefObject<HTMLDivElement> = React.createRef();

  render() {
    return (
      <>
      <div ref={this.div} className="container" style={{justifyContent: this.justifyContent()}}>
        <button className='button' onClick={this.didTapCallToAction.bind(this)}>{this.props.title}</button>
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

  justifyContent(): string {
    if (this.props.center === true) {
      return 'center'
    } else {
      return 'start'
    }
  }

  prepareForAnimation() {
    const div = this.div?.current;
    if (div !== null && div !== undefined) { div.style.opacity = `0`; }
  }

  animateIn(args?: { delay?: number }) {
    Utility.Animator.animate(this.div.current, { 
      from: Models.Transform.identity
        .opacity({ amount: 0 })
        .scaled({ amount: 0.95 })
        .translated({ y: 10 }),
        delay: args?.delay,
      duration: 6,
      curve: Models.AnimationCurve.spring()
    });
  }
}

export default Button;
