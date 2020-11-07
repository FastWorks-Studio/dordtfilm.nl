import React from 'react';
import './DownArrow.scss';
import * as Utility from '../../utility/module';
import * as Models from '../../models/module';

type Props = {
  action?: Function
}

export class DownArrow extends React.Component<Props> {

  button: React.RefObject<HTMLButtonElement> = React.createRef();
  img: React.RefObject<HTMLImageElement> = React.createRef();

  render() {
    return (<>
      <button ref={this.button} className="down-arrow" onClick={this.didTap.bind(this)} aria-hidden="true" style={{cursor: (this.props.action === undefined) ? `` : `pointer`}}>
        <img ref={this.img} className="down-arrow-image" src="./icons/arrow-down.svg" alt="Pijl naar beneden: indicatie dat hieronder nog meer mogelijk is" />
      </button>
    </>)
  }

  didTap() {
    if (this.props.action === undefined) { return; }
    this.props.action()
  }

  prepareForAnimation() {
    const button = this.button?.current;
    if (button !== null && button !== undefined) { button.style.opacity = `0`; }
  }

  animateIn(args?: { delay?: number }) {
    Utility.Animator.animate(this.button.current, { 
      from: Models.Transform.identity
        .opacity({ amount: 0 })
        .blurred({ amount: 10 })
        .translated({ y: -50 }),
        delay: args?.delay,
      duration: 7,
      curve: Models.AnimationCurve.spring()
    });
  }
}

export default DownArrow;