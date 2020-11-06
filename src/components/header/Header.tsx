import React from 'react';
import './Header.css';

type Props = {
    text: string
 }

export class Header extends React.Component<Props> {

  render() {
    return (
        <h1>{this.props.text}</h1>
    )
  }
}

export default Header;