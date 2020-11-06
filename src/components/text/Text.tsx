import React from 'react';
import './Text.css';

type Props = { }

export class Text extends React.Component<Props> {

  render() {
    return (
        <p>{this.props.children}</p>
    )
  }
}

export default Text;