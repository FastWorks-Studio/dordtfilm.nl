import React from 'react';
import './FillContainer.css';

type Props = { }

export class FillContainer extends React.Component<Props> {

  render() {
    return (
      <div className="fill-container">
        {this.props.children}
      </div>
    );
  }
}

export default FillContainer;
