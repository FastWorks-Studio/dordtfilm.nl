import React from 'react';
import './App.css';
import * as UI from './components/module';
import * as Utility from './utility/module';

type Props = { }

export class App extends React.Component<Props> {

  private downArrow?: HTMLElement;
  private downArrowHidden: boolean = false;

  private blurContent = (Utility.ClientInfo.isMobile === false) && Utility.ClientInfo.resolutionClass !== Utility.ResolutionClass.high;
  private blurLogo = (window.innerHeight * window.innerWidth) <= 1000000;

  render() {
    return (
      <>
        <UI.ParallaxPage image='home-preload.jpg' video='home.mp4' blurBackground={false} blurContent={this.blurLogo} loadingColor='#000000' focalDim={0}>
          <UI.Logo />
          <UI.Spacer size='1vh' />
          <UI.Button title="Like ons op facebook" action="https://www.facebook.com/dordtfilm" center={true}/>
        </UI.ParallaxPage>
        <UI.ParallaxPage image='about.jpg' blurContent={this.blurContent} loadingColor='#626850'>
          <UI.Text>Deze film is met liefdevolle toewijding gemaakt om u de stad te laten ervaren als nooit tevoren. Zie de pracht van de stad en de Dordtse Biesbosch in alle vier de seizoenen en uit allerlei hoeken gefilmd. Bovendien zijn we te land, ter zee en in de lucht.</UI.Text>
          <UI.Text>
          Natuurlijk komt u van alles te weten over de geschiedenis van de stad en wat Dordrecht nu zo bijzonder maakt. Vergeet echter die slome, stoffige geschiedenislessen van vroeger; hier houden we het vlot en boeiend, afgewisseld met een paar <del>flauwe</del> uitstekende grapjes.</UI.Text>
          <UI.Text>Wat maakt de stad zo bijzonder? Wat maakt een Dordtenaar speciaal? Zijn de inwoners trots op hun stad? We praten hierover met Dordtenaren en andere experts. Samen proberen we te ontdekken wat de Dordtse identiteit kenmerkt en komen we tot soms verrassende ontdekkingen over de stad en haar inwoners.</UI.Text>
        </UI.ParallaxPage>
        {/* <UI.ParallaxPage image='trailer.jpg' blurContent={false}  focalDim={0.5}>
          <UI.Header text="Bekijk de trailer" />
          <UI.YoutubePlayer name="Trailer" watchId="MrYbBcvdzIY" aspectRatio={4/3} />
        </UI.ParallaxPage> */}
        <UI.ParallaxPage image='experience.jpg' blurContent={this.blurContent} loadingColor='#77969D'>
          <UI.Header text="De ervaring" />
          <UI.Text>We nemen u mee door het prachtige oude stadscentrum, de wijken eromheen en de schitterende natuur die het Dordtse eiland te bieden heeft. Door het gebruik van de meest moderne filmtechnieken zoals drones, bewegende camera’s, haarscherpe beelden en surroundgeluid wordt u figuurlijk het beeld ingezogen.</UI.Text>
          <UI.Text>Deze film moet u absoluut gezien hebben als u zichzelf nog Schapenkop wilt durven noemen, óf als u als niet-Dordtenaar meer wilt weten over deze geweldige stad. Ervaar het zelf in <em>Dordrecht door de jaren heen.</em></UI.Text>
        </UI.ParallaxPage>
        <UI.ParallaxPage image='about-2.jpg' blurContent={this.blurContent} loadingColor='#4E5354'>
          <UI.Header text="Over de film" />
          <UI.Text>Onze enthousiaste verteller <UI.Link url="https://www.coenkoopmans.nl/" text="Coen Koopmans" /> neemt u vlot, gepassioneerd en soms met een knipoog mee door de hele geschiedenis. Althans, die van Dordrecht. Deze jongeman laat zich graag informeren door experts. Veel mensen zullen <UI.Link url="https://www.jaapbouman.nl/" text="Jaap Bouman"/> kennen als dé stadshistoricus van Dordrecht, hoewel hijzelf die titel weigert. Boswachter <UI.Link url="http://www.fotoneut.nl/" text="Jacques van der Neut" /> geeft een trotse rondleiding door de prachtige natuur van de Dordtse Biesbosch.
          <UI.Link url="http://baskakes.nl/" text="Bas Kakes" /> verzorgt onder meer de regie, de montage en het camerawerk. <UI.Link url="https://www.linkedin.com/in/kevin-van-den-hoek-9302b8145/" text="Kevin van den Hoek" /> verzorgt de grafische vormgeving en special effects, terug te zien in onder andere het titelontwerp en de poster.
          </UI.Text>
        </UI.ParallaxPage>
        <UI.ParallaxPage image='about-3.jpg' blurContent={this.blurContent} loadingColor='#A08569'>
          <UI.Header text="Passie" />
          <UI.Text>Het script is gebaseerd op de kennis en liefde voor de stad van scriptadviseur Arend van der Perk. Hij was de opa van zowel Bas Kakes als Coen Koopmans. Door de jaren heen heeft Arend zijn passie voor zijn stad veelvuldig en bewonderenswaardig intens laten blijken. Zo raadt hij bijvoorbeeld af om te reizen naar verre landen, want “de Biesbosch is het mooiste dat er is”.</UI.Text> 
          <UI.Text>Eind 2018 besloten Kakes en Koopmans dat ze hun volgende film op die passie zouden baseren. De makers hebben al jaren ervaring in het produceren van films en maken met deze titel hun debuut in het genre ‘documentaire’.</UI.Text>
          <UI.Spacer size="5vh" />
          <UI.Button title="Like ons op facebook" action="https://www.facebook.com/dordtfilm" />
        </UI.ParallaxPage>
        <UI.ParallaxPage image='contact-preload.jpg' video='contact.mp4' blurContent={this.blurContent} blurBackground={false}>
          <UI.Header text="Contact" />
          <UI.Text>Wilt u contact opnemen met de makers?</UI.Text>
          <UI.Spacer size="5vh" />
          <UI.Button title="Mail ons" action="mailto:info@dordtfilm.nl"/>
        </UI.ParallaxPage>
        <UI.DownArrow />
      </>
    );
  }

  componentDidMount() {
    this.setupSafariResizeFix();
    this.setupDownArrowAlphaUpdates();
    this.downArrow = document.getElementsByClassName('down-arrow')[0] as HTMLElement;
  }

  setupDownArrowAlphaUpdates() {
    const context = this;
    document.addEventListener("scroll", function() {
      if (context.downArrowHidden) { return; }
      const alpha = Math.min(1, Math.max(0, 1 - (window.scrollY / (window.innerHeight * 0.1))));
      if (context.downArrow === undefined) { return; }
      context.downArrow.style.opacity = `${alpha}`
      if (alpha === 0) { context.downArrowHidden = true; }
    });
  }

  refreshPage() {
    window.location.reload()
  }

  setupSafariResizeFix() {
    if (Utility.ClientInfo.isSafari === false || Utility.ClientInfo.isMobile === true) { return; }
    window.onresize = this.debounce(this.refreshPage, 100).bind(this);
  }

  private debounceTimeout: NodeJS.Timeout | null = null;
  debounce(func: Function, delay: number) {
    let context = this;
    return function() {
      var later = function() {
        context.debounceTimeout = null;
        func.apply(context, arguments);
      };
      if (context.debounceTimeout !== null ) { clearTimeout(context.debounceTimeout); }
      context.debounceTimeout = setTimeout(later, delay);
    };
  };
}

export default App;

