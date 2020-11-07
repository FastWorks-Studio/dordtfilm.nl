import React from 'react';
import './App.css';
import * as UI from './components/module';
import * as Scenes from './scenes/module';
import * as Utility from './utility/module';

type Props = { }

export class App extends React.Component<Props> {

  private downArrow: React.RefObject<UI.DownArrow> = React.createRef();
  private downArrowHidden: boolean = false;

  render() {
    return (
      <>
        <Scenes.HomeScene onDidLoadBackground={this.onDidLoadHome.bind(this)} />
        <Scenes.AboutScene />
        {/* <Scenes.TrailerScene /> */}
        <Scenes.ExperienceScene />
        <Scenes.PeopleScene />
        <Scenes.ContactScene />
        <UI.DownArrow ref={this.downArrow} />
      </>
    );
  }

  componentDidMount() {
    this.setupSafariResizeFix();
    this.setupDownArrowAlphaUpdates();
    this.downArrow.current?.prepareForAnimation();
  }

  onDidLoadHome() {
    this.downArrow.current?.animateIn({ delay: 3 });
  }

  setupDownArrowAlphaUpdates() {
    const context = this;
    document.addEventListener("scroll", function() {
      if (context.downArrowHidden) { return; }
      const alpha = Math.min(1, Math.max(0, 1 - (window.scrollY / (window.innerHeight * 0.1))));
      const downArrow = context.downArrow.current?.img.current;
      if (downArrow === undefined || downArrow === null) { return; }
      downArrow.style.opacity = `${alpha}`
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

