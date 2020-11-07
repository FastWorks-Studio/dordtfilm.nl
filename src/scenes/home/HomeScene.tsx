import React from 'react';
import './HomeScene.css';
import * as UI from '../../components/module';
import * as Utility from '../../utility/module';
import * as Models from '../../models/module';

type Props = {
    onDidLoadBackground?: () => void
}

export class HomeScene extends React.Component<Props> {

  private blurLogo = (window.innerHeight * window.innerWidth) <= 1000000;

  private logo: React.RefObject<UI.Logo> = React.createRef()
  private button: React.RefObject<UI.Button> = React.createRef()

  render() {
    return (
        <UI.ParallaxPage image='home-preload.jpg' video='home.mp4' blurBackground={false} blurContent={this.blurLogo} loadingColor='#000000' focalDim={0} animateEntry={true} onDidLoadBackground={this.didLoadBackground.bind(this)}>
          <UI.Logo ref={this.logo} />
          {/* <UI.Spacer size='1vh' />
          <UI.Button title="Like ons op facebook" action="https://www.facebook.com/dordtfilm" center={true} ref={this.button}/> */}
        </UI.ParallaxPage>
    )
  }

  componentDidMount() {
    this.logo.current?.prepareForAnimation();
    this.button.current?.prepareForAnimation();
  }

  private didLoadBackground(element: UI.ParallaxPage) {
    if (this.props.onDidLoadBackground) { this.props.onDidLoadBackground(); }
    const logo = this.logo.current;
    if (logo === undefined || logo === null) { return; }
    logo?.animateIn({ delay: 0.7 });
    const button = this.button.current;
    if (button === undefined || button === null) { return; }
    button?.animateIn({ delay: 2.5 });
  }
}

export default HomeScene;