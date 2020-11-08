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

  private opacity: number = 1;
  private preferredOpacity: number = 1;

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
    this.preferredOpacity = value;
    this.renderOpacity();
  }

  renderOpacity() {
    const container = this.container?.current;
    if (container !== null && container !== undefined) { 
      container.style.opacity = `${Math.min(this.preferredOpacity, this.opacity)}`; 
    }
  }

  prepareForAnimation() {
    this.opacity = 0;
    this.renderOpacity();
  }

  animateIn(args?: { delay?: number }) {
    const img = this.img.current;
    this.opacity = 1;
    Utility.Animator.animate(this.container.current, { 
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