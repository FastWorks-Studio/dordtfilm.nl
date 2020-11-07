import React from 'react';
import './Link.scss';

type Props = {
    url: string
    text: string
 }

export class Link extends React.Component<Props> {

  render() {
    return (
        <a href={this.props.url} rel="noreferrer" target="_blank">{this.props.text}</a>
    )
  }
}

export default Link;