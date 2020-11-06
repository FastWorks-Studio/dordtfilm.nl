import React from 'react';
import './Button.css';

type Props = {
  title: string
  action: string | Function
  center?: boolean
}

export class Button extends React.Component<Props> {

  render() {
    return (
      <>
      <div className="container" style={{justifyContent: this.justifyContent()}}>
        <button className='button' onClick={this.didTapCallToAction.bind(this)}>{this.props.title}</button>
      </div>
      </>
    );
  }

  didTapCallToAction() {
    console.log(`user did tap ${this.props.action}`);
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
}

export default Button;
