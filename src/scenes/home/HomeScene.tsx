import React from 'react';
import './HomeScene.css';
import * as UI from '../../components/module';

type Props = {
    onDidLoadBackground?: () => void
}

export class HomeScene extends React.Component<Props> {

  private blurLogo = (window.innerHeight * window.innerWidth) <= 1000000;

  private logo: React.RefObject<UI.Logo> = React.createRef();
  private button: React.RefObject<UI.Button> = React.createRef();
  private fbButton: React.RefObject<UI.SocialMediaButton> = React.createRef();

  render() {
    return (
        <UI.ParallaxPage image='home.jpg' video='home.mp4' blurBackground={false} blurContent={this.blurLogo} loadingColor='#000000' focalDim={0} animateEntry={true} onDidLoadBackground={this.didLoadBackground.bind(this)}>
          <UI.BarOverlay
          position={UI.BarOverlayPosition.top} 
          alignment={UI.BarOverlayAlignment.left}>
            <UI.SocialMediaButton ref={this.fbButton} title="Like ons" icon="facebook.png" iconAlt="facebook logo" action="https://www.facebook.com/dordtfilm" />
            {/* <UI.SocialMediaButton title="#dordtfilm" icon="twitter.png" iconAlt="twitter logo" action="https://www.facebook.com/dordtfilm" /> */}
          </UI.BarOverlay>
          <UI.Logo ref={this.logo} />
          {/* <UI.Spacer size='1vh' />
          <UI.Button title="Koop nu kaartjes" action="https://www.google.com/" center={true} ref={this.button}/> */}
        </UI.ParallaxPage>
    )
  }

  componentDidMount() {
    this.logo.current?.prepareForAnimation();
    this.button.current?.prepareForAnimation();
    this.fbButton.current?.prepareForAnimation();
  }

  private didLoadBackground(element: UI.ParallaxPage) {
    if (this.props.onDidLoadBackground) { this.props.onDidLoadBackground(); }
    const logo = this.logo.current;
    logo?.animateIn({ delay: 0.7 });
    const button = this.button.current;
    button?.animateIn({ delay: 2.5 });
    const stickyBar = this.fbButton.current;
    stickyBar?.animateIn({ delay: 2.3 });
  }
}

export default HomeScene;