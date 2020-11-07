import React from 'react';
import './ExperienceScene.css';
import * as UI from '../../components/module';

type Props = {
    
}

export class ExperienceScene extends React.Component<Props> {

    private blurLogo = (window.innerHeight * window.innerWidth) <= 1000000;

  render() {
    return (
        <UI.ParallaxPage image='experience.jpg' loadingColor='#77969D'>
          <UI.Header text="De ervaring" />
          <UI.Text>We nemen u mee door het prachtige oude stadscentrum, de wijken eromheen en de schitterende natuur die het Dordtse eiland te bieden heeft. Door het gebruik van de meest moderne filmtechnieken zoals drones, bewegende camera’s, haarscherpe beelden en surroundgeluid wordt u figuurlijk het beeld ingezogen.</UI.Text>
          <UI.Text>Deze film moet u absoluut gezien hebben als u zichzelf nog Schapenkop wilt durven noemen, óf als u als niet-Dordtenaar meer wilt weten over deze geweldige stad. Ervaar het zelf in <em>Dordrecht door de jaren heen.</em></UI.Text>
        </UI.ParallaxPage>
    )
  }
}

export default ExperienceScene;