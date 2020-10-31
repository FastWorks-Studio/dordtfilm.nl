import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title: string = 'Dordrecht';
  public subtitle: string = 'door de jaren heen';
  public buttonText: string = 'Koop nu kaartjes';
  public arrowAlpha: number = 1;

  private wrapperElement: HTMLElement;

  constructor(
  ) {}

  public ngOnInit(): void {
    this.wrapperElement = document.getElementsByClassName(
      'body'
    )[0] as HTMLElement;
    this.wrapperElement.addEventListener('scroll', this.onWindowScroll.bind(this));
  }

  public scrollDown(): void {
    const pageElements: HTMLElement[] = (Array.from(document.getElementsByClassName('page')) as HTMLElement[])
      .filter(page => !!page.offsetParent);
    const nextElement: HTMLElement = pageElements.filter(element => element.getBoundingClientRect().y > 100)[0];
    if (!nextElement) { return; }
    this.wrapperElement.scroll({
      top: nextElement.getBoundingClientRect().y + this.wrapperElement.scrollTop,
      left: window.scrollX,
      behavior: 'smooth',
    });
  }

  public onWindowScroll(event: Event): void {
    const pageElements: HTMLElement[] = (Array.from(document.getElementsByClassName('page')) as HTMLElement[])
      .filter(page => !!page.offsetParent);
    const last: HTMLElement = pageElements[pageElements.length - 1];
    const offset: number = last.getBoundingClientRect().y;
    const height: number = last.getBoundingClientRect().height;
    const alpha: number = Math.max(0, Math.min(100, offset - (height - 100)) / 100);
    this.arrowAlpha = alpha;
  }
}
