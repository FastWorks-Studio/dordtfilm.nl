import React from 'react';
import './Player.css';
import * as UI from '../module';

type Props = { 
    video: string
    onWillLoad?: (element: HTMLVideoElement) => void
    onDidLoad?: (element: HTMLVideoElement) => void
}
export class Player extends React.Component<Props> {

  private container: React.RefObject<UI.FillContainer> = React.createRef()
  private div: React.RefObject<HTMLDivElement> = React.createRef()
  private player: React.RefObject<HTMLVideoElement> = React.createRef()

  private videoSize: { width: number, height: number } = { width: 1, height: 1};

  render() {
    return (
        <UI.FillContainer ref={this.container}>
          <div className="player-container" ref={this.div}>
            <video className="player-video" ref={this.player} src={`/video/${this.props.video}`} autoPlay={true} muted={true} loop={true} playsInline onPlay={this.onPlay.bind(this)} aria-hidden="true"/>
          </div>
        </UI.FillContainer>
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.updatePlayerSize.bind(this));
    const videoElement = this.player.current;
    if (videoElement === null || videoElement === undefined) { return; }
    const onDidLoad = this.props.onDidLoad;
    if (this.props.onWillLoad !== undefined && this.props.onWillLoad !== null) { 
      this.props.onWillLoad(videoElement); 
    }
    if (onDidLoad === undefined || onDidLoad === null) { return; }
    videoElement.addEventListener('loadeddata', (e) => {
      if(videoElement.readyState >= 3){
          onDidLoad(videoElement);
      }
   });
  }

  private onPlay() {
    const videoElement = this.player.current;
    if (videoElement === undefined || videoElement === null) { return; }
    this.videoSize = { width: videoElement.videoWidth, height: videoElement.videoHeight };
    this.updatePlayerSize()
  }

  private updatePlayerSize() {
    const div = this.div.current;
    if (div === undefined || div === null) { return; }
    const rect = div.getBoundingClientRect();
    if (rect === undefined || div === null) { return; }
    const playerAspect = this.videoSize.width / this.videoSize.height;
    const parentAspect = rect.width / rect.height;
    const player = this.player.current;
    if (player === undefined || player === null) { return; }
    const style = player.style;
    if (style === undefined || style === null) { return; }
    if (playerAspect > parentAspect) {
      style.height = `100%`;
    } else {
      const height = rect.width / playerAspect;
      style.height = `${((height / rect.height) * 100).toFixed(1)}%`
    }
  }
}

export default Player;
