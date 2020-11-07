import React from 'react';
import './ContactScene.css';
import * as UI from '../../components/module';

type Props = {
    
}

export class ContactScene extends React.Component<Props> {

  render() {
    return (
        <UI.ParallaxPage image='contact.jpg' video='contact.mp4' blurBackground={false}>
          <UI.Header text="Contact" />
          <UI.Text>Wilt u contact opnemen met de makers?</UI.Text>
          <UI.Spacer size="5vh" />
          <UI.Button title="Mail ons" action="mailto:info@dordtfilm.nl"/>
        </UI.ParallaxPage>
    )
  }
}

export default ContactScene;