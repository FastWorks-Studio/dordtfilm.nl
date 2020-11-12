import React from 'react';
import './YoutubePlayer.css';
import * as Utility from '../../utility/module';

type Props = {
  watchId: string
  aspectRatio?: number
}
export class YoutubePlayer extends React.Component<Props> {

  private get playerId() { return `youtubeplayer-${this.id}-${this.props.watchId}` }
  private get containerId() { return `youtubeplayercontainer-${this.id}-${this.props.watchId}` }

  private id: string = Utility.UUIDGenerator.uuid;
  private aspectRatio: number = 16 / 9;

  private videoSize: { width: number, height: number } = { width: 640, height: 480 };

  render() {
    return (
      <div className="youtubeplayer-container" id={this.containerId}>
        <div className="youtubeplayer-centercontainer">
          <iframe className="youtubeplayer-iframe" id={this.playerId} width={`${this.videoSize.width}px`} height={`${this.videoSize.height}px`} src={`https://www.youtube.com/embed/${this.props.watchId}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.aspectRatio = this.props.aspectRatio || this.aspectRatio;
    window.addEventListener('resize', this.determinePlayerSize.bind(this));
    this.determinePlayerSize();
  }

  private determinePlayerSize() {
    const container = document.getElementById(this.containerId) as HTMLElement;
    if (container === undefined || container === null) { return; }
    const rect = container.getBoundingClientRect();
    if (rect === undefined || rect === null) { return; }
    const windowAspect = window.innerWidth / window.innerHeight;
    const width = rect.width / Math.max(1, windowAspect);
    this.updatePlayerSize({ width: width, height: width / this.aspectRatio })
  }

  private updatePlayerSize(size: { width: number, height: number }) {
    if ((size.width !== this.videoSize.width || size.height !== this.videoSize.height) === false) { return; }
    this.videoSize = size;
    this.setState({})
  }
}

export default YoutubePlayer;
