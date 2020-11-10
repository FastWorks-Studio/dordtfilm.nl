import React from 'react';
import './Disclaimer.scss';

type Props = { }

export class Disclaimer extends React.Component<Props> {

  render() {
    return (<>
    <div className="container">
        <div className="separator" />
        {this.props.children}
        <div className="separator" />
    </div>
    </>)
  }
}

export default Disclaimer;