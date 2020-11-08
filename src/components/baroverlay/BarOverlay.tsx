import React from 'react';
import './BarOverlay.scss';
import * as UI from '../module';
import * as Utility from '../../utility/module';
import { isNullishCoalesce } from 'typescript';

type Props = {
  position: BarOverlayPosition
  alignment: BarOverlayAlignment
  insets?: string
  persistence?: BarOverlayPersistence
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
        style={{ position: this.position }} >
        <div 
          ref={this.div} 
          className="baroverlay-container" 
          style={this.makeStyle()} >
            {this.props.children}
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

  get position(): "absolute" | "fixed" {
    if (this.props.persistence === undefined || this.props.persistence === null) { return 'absolute'; }
    switch (this.props.persistence) {
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
        style.alignItems = `flex-start`; break;
      case BarOverlayAlignment.right:
        style.right = this.insets;
        style.alignItems = `flex-end`; break;
      case BarOverlayAlignment.center:
        style.alignItems = `center`; break;
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
