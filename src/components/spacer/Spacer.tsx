import React from 'react';
import './Spacer.css';

type Props = { 
  size: string
}

export class Spacer extends React.Component<Props> {

  render() {
    return (
      <>
        <div className="page" style={{ height: this.props.size, width: this.props.size }}/>
      </>
    );
  }
}

export default Spacer;
