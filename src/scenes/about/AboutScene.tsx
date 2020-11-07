import React from 'react';
import './AboutScene.css';
import * as UI from '../../components/module';

type Props = {
    
}

export class AboutScene extends React.Component<Props> {

  render() {
    return (
        <UI.ParallaxPage image='about.jpg' video='boat.mp4' loopVideo={false} loadingColor='#626850' backgroundXOffset={0.4}>
          <UI.Text>Deze film is met liefdevolle toewijding gemaakt om u de stad te laten ervaren als nooit tevoren. Zie de pracht van de stad en de Dordtse Biesbosch in alle vier de seizoenen en uit allerlei hoeken gefilmd. Bovendien zijn we te land, ter zee en in de lucht.</UI.Text>
          <UI.Text>
          Natuurlijk komt u van alles te weten over de geschiedenis van de stad en wat Dordrecht nu zo bijzonder maakt. Vergeet echter die slome, stoffige geschiedenislessen van vroeger; hier houden we het vlot en boeiend, afgewisseld met een paar <del>flauwe</del> uitstekende grapjes.</UI.Text>
          <UI.Text>Wat maakt de stad zo bijzonder? Wat maakt een Dordtenaar speciaal? Zijn de inwoners trots op hun stad? We praten hierover met Dordtenaren en andere experts. Samen proberen we te ontdekken wat de Dordtse identiteit kenmerkt en komen we tot soms verrassende ontdekkingen over de stad en haar inwoners.</UI.Text>
        </UI.ParallaxPage>
    )
  }
}

export default AboutScene;