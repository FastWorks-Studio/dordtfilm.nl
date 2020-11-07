import React from 'react';
import './PassionScene.css';
import * as UI from '../../components/module';

type Props = {
    
}

export class PassionScene extends React.Component<Props> {

  render() {
    return (
    <UI.ParallaxPage image='about-3.jpg' loadingColor='#A08569'>
        <UI.Header text="Passie" />
        <UI.Text>Het script is gebaseerd op de kennis en liefde voor de stad van scriptadviseur Arend van der Perk. Hij was de opa van zowel Bas Kakes als Coen Koopmans. Door de jaren heen heeft Arend zijn passie voor zijn stad veelvuldig en bewonderenswaardig intens laten blijken. Zo raadt hij bijvoorbeeld af om te reizen naar verre landen, want “de Biesbosch is het mooiste dat er is”.</UI.Text> 
        <UI.Text>Eind 2018 besloten Kakes en Koopmans dat ze hun volgende film op die passie zouden baseren. De makers hebben al jaren ervaring in het produceren van films en maken met deze titel hun debuut in het genre ‘documentaire’.</UI.Text>
        <UI.Spacer size="5vh" />
        <UI.Button title="Like ons op facebook" action="https://www.facebook.com/dordtfilm" />
    </UI.ParallaxPage>
    )
  }
}

export default PassionScene;



