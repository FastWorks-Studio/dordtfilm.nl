import React from 'react';
import './Player.css';
import * as UI from '../module';
import * as Utility from '../../utility/module';

type Props = { 
    video: string
}
export class Player extends React.Component<Props> {

  private container?: React.RefObject<UI.FillContainer>
  private div?: React.RefObject<HTMLDivElement>
  private player?: React.RefObject<HTMLVideoElement>

  private get playerId() { return `player-${this.id}-${this.props.video}` }
  private get containerId() { return `container-${this.id}-${this.props.video}` }
  private id: string = Utility.UUIDGenerator.uuid;

  private videoSize: { width: number, height: number } = { width: 1, height: 1};

  render() {
    return (
        <UI.FillContainer ref={this.container}>
          <div className="player-container" ref={this.div} id={this.containerId}>
            <video className="player-video" id={this.playerId} ref={this.player} src={`/video/${this.props.video}`} autoPlay={true} muted={true} loop={true} playsInline onPlay={this.onPlay.bind(this)} aria-hidden="true"/>
          </div>
        </UI.FillContainer>
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.updatePlayerSize.bind(this));
  }

  private onPlay() {
    const player = document.getElementById(this.playerId) as HTMLVideoElement;
    if (player === undefined) { return; }
    this.videoSize = { width: player.videoWidth, height: player.videoHeight };
    this.updatePlayerSize()
  }

  private updatePlayerSize() {
    const container = document.getElementById(this.containerId) as HTMLElement;
    if (container === undefined || container === null) { return; }
    const rect = container.getBoundingClientRect();
    if (rect === undefined || container === null) { return; }
    const playerAspect = this.videoSize.width / this.videoSize.height;
    const parentAspect = rect.width / rect.height;
    const player = document.getElementById(this.playerId) as HTMLElement;
    if (player === undefined) { return; }
    const style = player.style;
    if (style === undefined) { return; }
    if (playerAspect > parentAspect) {
      style.height = `100%`;
    } else {
      const height = rect.width / playerAspect;
      style.height = `${((height / rect.height) * 100).toFixed(1)}%`
    }
  }
}

export default Player;
