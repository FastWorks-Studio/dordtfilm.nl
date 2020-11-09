import React from 'react';
import './TestScene.scss';
import * as UI from '../../components/module';

type Props = {
    
}

export class TestScene extends React.Component<Props> {

  render() {
    return (<>
        <div className="parallax__group">
            <div className="parallax__layer parallax__layer--back">
                ayy
            </div>
            <div className="parallax__layer parallax__layer--base">
                lmao
            </div>
        </div>
        <div className="parallax__group">
            <div className="parallax__layer parallax__layer--back">
                ayy
            </div>
            <div className="parallax__layer parallax__layer--base">
                lmao
            </div>
        </div>
    </>)
  }
}

export default TestScene;
