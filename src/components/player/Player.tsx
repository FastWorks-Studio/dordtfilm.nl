import React from 'react';
import './Player.scss';
import * as UI from '../module';

type Props = { 
    video: string
    loopVideo?: boolean
    xOffset?: number
    autoplay?: boolean
    onEnded?: () => void
}
export class Player extends React.Component<Props> {

  private container: React.RefObject<UI.FillContainer> = React.createRef()
  private div: React.RefObject<HTMLDivElement> = React.createRef()
  private player: React.RefObject<HTMLVideoElement> = React.createRef()

  get loopVideo(): boolean {
    if (this.props.loopVideo !== undefined && this.props.loopVideo !== null) {
      return this.props.loopVideo;
    } else {
      return true;
    }
  }

  get autoplay(): boolean {
    if (this.props.autoplay !== undefined && this.props.autoplay !== null) {
      return this.props.autoplay;
    } else {
      return true;
    }
  }

  render() {
    return (
        <UI.FillContainer ref={this.container}>
          <div className="player-container" ref={this.div}>
            <video 
              className="player-video" 
              ref={this.player} 
              src={`/video/${this.props.video}`} 
              muted={true} 
              loop={this.loopVideo}
              autoPlay={this.autoplay}
              playsInline 
              onPlay={this.onPlay.bind(this)} 
              aria-hidden="true" />
          </div>
        </UI.FillContainer>
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.updatePlayerSize.bind(this));
    const videoElement = this.player.current;
    if (videoElement === undefined || videoElement === null) { return; }
    videoElement.style.opacity = `0`;
    const onEnded = this.props.onEnded;
    if (onEnded === null || onEnded === undefined) { return; }
    videoElement.addEventListener('ended', onEnded);
  }

  rewind() {
    const player = this.player.current;
    if (player === null || player === undefined) { return; }
    player.currentTime = 0;
  }

  play() {
    const player = this.player.current;
    if (player === null || player === undefined) { return; }
    const context = this;
    player.play().then(response => { context.onPlay(); });
  }

  stop() {
    const player = this.player.current;
    if (player === null || player === undefined) { return; }
    player.pause();
  }

  private onPlay() {
    const videoElement = this.player.current;
    if (videoElement === undefined || videoElement === null) { return; }
    videoElement.style.opacity = `1`;
    this.updatePlayerSize()
  }

  private updatePlayerSize() {
    const div = this.div.current;
    if (div === undefined || div === null) { return; }
    const rect = div.getBoundingClientRect();
    if (rect === undefined || div === null) { return; }
    const player = this.player.current;
    if (player === undefined || player === null) { return; }
    const videoSize = { width: player.videoWidth, height: player.videoHeight };
    if (videoSize.width === 0 || videoSize.height === 0) { return; }
    const playerAspect = videoSize.width / videoSize.height;
    const parentAspect = rect.width / rect.height;
    const style = player.style;
    if (style === undefined || style === null) { return; }
    if (playerAspect > parentAspect) {
      style.height = `100%`;
      if (this.props.xOffset !== null && this.props.xOffset !== undefined) {
        const overshoot = (playerAspect / parentAspect) - 1;
        style.transform = `translate3d(${overshoot * this.props.xOffset * 50}vw, 0vw, 0vw)`;
      }
    } else {
      const height = rect.width / playerAspect;
      style.height = `${((height / rect.height) * 100).toFixed(1)}%`
    }
  }
}

export default Player;
