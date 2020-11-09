import React from 'react';
import './TrailerScene.css';
import * as UI from '../../components/module';

type Props = {
    
}

export class TrailerScene extends React.Component<Props> {

  render() {
    return (
        <UI.ParallaxPage image='trailer.jpg' blurContent={false}  focalDim={0.5}>
            <UI.Header text="Bekijk de trailer" />
            <UI.YoutubePlayer name="Trailer" watchId="UaWEIS1gn9c" />
        </UI.ParallaxPage>
    )
  }
}

export default TrailerScene;
