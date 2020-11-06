import React from 'react';
import './DownArrow.css';

type Props = {
  action?: Function
}

export class DownArrow extends React.Component<Props> {

  render() {
    return (
    <>
      <button className="down-arrow" onClick={this.didTap.bind(this)} aria-hidden="true" style={{cursor: (this.props.action === undefined) ? `` : `pointer`}}>
        <img className="down-arrow-image" src="./icons/arrow-down.svg" alt="Pijl naar beneden: indicatie dat hieronder nog meer mogelijk is" />
      </button>
    </>)
  }

  didTap() {
    if (this.props.action === undefined) { return; }
    this.props.action()
  }
}

export default DownArrow;