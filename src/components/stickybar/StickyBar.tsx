import React from 'react';
import './StickyBar.css';
import * as UI from '../module';

type Props = { }

export class StickyBar extends React.Component<Props> implements UI.Animatable {

  div: React.RefObject<HTMLDivElement> = React.createRef();

  get animatables(): UI.Animatable[] {
    return React.Children.toArray(this.props.children)
        .map(e => e as UI.Animatable)
        .filter(e => e !== null && e !== undefined)
  }

  render() {
    return (
      <div ref={this.div} className="stickybar-container" >
        {this.props.children}
      </div>
    );
  }

  prepareForAnimation() {
    // TODO: Loop through children
  }

  animateIn(args?: { delay?: number }) {
      // TODO: Loop through children
  }
}

export default StickyBar;
