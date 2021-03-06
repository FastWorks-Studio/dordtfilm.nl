import React from 'react';
import './BarOverlay.scss';
import * as UI from '../module';
import * as Utility from '../../utility/module';

type Props = {
  position: BarOverlayPosition
  alignment: BarOverlayAlignment
  insets?: string
  persistence?: BarOverlayPersistence
  spacing?: string
}

export enum BarOverlayPersistence {
  default,
  sticky
}

export enum BarOverlayPosition {
  top,
  bottom
}

export enum BarOverlayAlignment {
  left,
  right,
  center
}

export class BarOverlay extends React.Component<Props> implements UI.Animatable {

  div: React.RefObject<HTMLDivElement> = React.createRef();

  get animatables(): UI.Animatable[] {
    return React.Children.toArray(this.props.children)
        .map(e => e as UI.Animatable)
        .filter(e => e !== null && e !== undefined)
  }

  render() {
    return (
      <div 
        ref={this.div} 
        className="baroverlay-safearea-container" 
        style={this.makeContainerStyle()} >
        <div 
          ref={this.div} 
          className="baroverlay-container" 
          style={this.makeStyle()} >
            {React.Children.map(this.props.children, (child, index) => { 
              return (<>
                {child}
                {index === React.Children.toArray(this.props.children).length - 1 || (<UI.Spacer size={this.spacing} />)}
              </>)
            })}
        </div>
      </div>
    );
  }

  get insets(): string {
    if (Utility.isVoid(this.props.insets)) {
      return '5vmin';
    } else {
      return this.props.insets || '0'
    }
  }

  get spacing(): string {
    if (Utility.isVoid(this.props.spacing)) {
      return '1vmin';
    } else {
      return this.props.spacing || '0'
    }
  }

  get position(): "absolute" | "fixed" {
    switch (this.props.persistence ?? BarOverlayPersistence.default) {
      case BarOverlayPersistence.default:
        return 'absolute';
      case BarOverlayPersistence.sticky:
        return 'fixed';
    }
  }

  makeStyle(): React.CSSProperties {
    let style: React.CSSProperties = {
      left: this.insets,
      right: this.insets
    };
    switch (this.props.position) {
      case BarOverlayPosition.top:
        style.top = this.insets; break;
      case BarOverlayPosition.bottom:
        style.bottom = this.insets; break;
    }
    switch (this.props.alignment) {
      case BarOverlayAlignment.left:
        style.left = this.insets;
        style.alignItems = `flex-start`; 
        break;
      case BarOverlayAlignment.right:
        style.right = this.insets;
        style.alignItems = `flex-end`; 
        break;
      case BarOverlayAlignment.center:
        style.alignItems = `center`; 
        break;
    }
    return style;
  }

  makeContainerStyle() {
    let style: React.CSSProperties = { position: this.position }
    switch (this.props.alignment) {
      case BarOverlayAlignment.left:
        style.left = "env(safe-area-inset-left)";
        style.width = "50%";
        break;
      case BarOverlayAlignment.right:
        style.right = "env(safe-area-inset-right)";
        style.width = "50%";
        break;
      case BarOverlayAlignment.center:
        style.right = "env(safe-area-inset-right)";
        style.left = "env(safe-area-inset-left)";
        break;
    }
    return style;
  }

  prepareForAnimation() {
    // TODO: Loop through children
  }

  animateIn(args?: { delay?: number }) {
      // TODO: Loop through children
  }
}

export default BarOverlay;
