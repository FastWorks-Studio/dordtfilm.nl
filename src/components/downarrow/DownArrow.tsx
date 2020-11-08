import React from 'react';
import './DownArrow.scss';
import * as Utility from '../../utility/module';
import * as Models from '../../models/module';

type Props = {
  action?: Function
}

export class DownArrow extends React.Component<Props> {

  img: React.RefObject<HTMLImageElement> = React.createRef();
  container: React.RefObject<HTMLDivElement> = React.createRef();

  render() {
    return (<>
      <div className="down-arrow-container" ref={this.container}>
        <img ref={this.img} className="down-arrow-image" src="./icons/arrow-down.svg" alt="Pijl naar beneden: indicatie dat hieronder nog meer mogelijk is" />
      </div>
    </>)
  }

  didTap() {
    if (this.props.action === undefined) { return; }
    this.props.action()
  }

  setPreferredOpacity(value: number) {
    const container = this.container?.current;
    if (container === null || container === undefined) { return; }
    requestAnimationFrame(function() { 
      container.style.opacity = `${value}`;
    })
  }

  prepareForAnimation() {
    const img = this.img.current;
    if (img === undefined || img === null) { return; }
    img.style.opacity = `0`;
  }

  animateIn(args?: { delay?: number }) {
    const img = this.img.current;
    Utility.Animator.animate(img, { 
      from: Models.Transform.identity
        .opacity({ amount: 0 })
        .blurred({ amount: 5 })
        .translated({ y: -150 }),
        delay: args?.delay,
      duration: 3,
      curve: Models.AnimationCurve.easeOut,
      completion: function() { 
        if (img) { img.style.animation = "float 3s infinite"; }
      }
    });
  }
}

export default DownArrow;