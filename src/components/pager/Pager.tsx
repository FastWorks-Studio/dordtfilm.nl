import React from 'react';
import './Pager.scss';

type Props = { }

export class Pager extends React.Component<Props> {

  render() {
    return (
      <div className="pager">
        {React.Children.map(this.props.children, child => { 
          return (
            <div className="pager-element">{child}</div>
          )
        })}
      </div>
    )
  }
}

export default Pager;