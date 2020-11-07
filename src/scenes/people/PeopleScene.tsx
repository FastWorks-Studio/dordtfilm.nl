import React from 'react';
import './PeopleScene.css';
import * as UI from '../../components/module';

type Props = {
    
}

export class PeopleScene extends React.Component<Props> {

  render() {
    return (
        <UI.ParallaxPage image='people.jpg' video='people.mp4' loopVideo={false} loadingColor='#4E5354'>
          <UI.Header text="Over de film" />
          <UI.Text>Onze enthousiaste verteller <UI.Link url="https://www.coenkoopmans.nl/" text="Coen Koopmans" /> neemt u vlot, gepassioneerd en soms met een knipoog mee door de hele geschiedenis. Althans, die van Dordrecht. Deze jongeman laat zich graag informeren door experts. Veel mensen zullen <UI.Link url="https://www.jaapbouman.nl/" text="Jaap Bouman"/> kennen als dé stadshistoricus van Dordrecht, hoewel hijzelf die titel weigert. Boswachter <UI.Link url="http://www.fotoneut.nl/" text="Jacques van der Neut" /> geeft een trotse rondleiding door de prachtige natuur van de Dordtse Biesbosch.
          <UI.Link url="http://baskakes.nl/" text="Bas Kakes" /> verzorgt onder meer de regie, de montage en het camerawerk. <UI.Link url="https://www.linkedin.com/in/kevin-van-den-hoek-9302b8145/" text="Kevin van den Hoek" /> verzorgt de grafische vormgeving en special effects, terug te zien in onder andere het titelontwerp en de poster.
          </UI.Text>
        </UI.ParallaxPage>
    )
  }
}

export default PeopleScene;