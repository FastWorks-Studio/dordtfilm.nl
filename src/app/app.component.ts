import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title: string = 'Dordrecht';
  public subtitle: string = 'door de jaren heen';
  public buttonText: string = 'Like ons op Facebook';
  public buttonHref: string = 'https://www.facebook.com/dordtfilm';
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
      this.updateArrowAlpha(pageElements);
      // this.updateParallax(pageElements);
  }

  private updateArrowAlpha(pageElements: HTMLElement[]): void {
    const last: HTMLElement = pageElements[pageElements.length - 1];
    const offset: number = last.getBoundingClientRect().y;
    const height: number = last.getBoundingClientRect().height;
    const alpha: number = Math.max(0, Math.min(100, offset - (height - 100)) / 100);
    this.arrowAlpha = alpha;
  }

  private updateParallax(pageElements: HTMLElement[]): void {
    pageElements.filter(this.isInViewport).forEach(element => {
      const rect: DOMRect = element.getBoundingClientRect();
      const offset: number = this.clamped(rect.y / rect.height, { min: -1, max: 1 });
      console.log(`Offset for ${element.className}: ${offset}`);
    });
  }

  private isInViewport(element: HTMLElement): boolean {
    const rect: DOMRect = element.getBoundingClientRect();
    return rect.y >= -rect.height && rect.y <= rect.height;
  }

  private clamped(value: number, range: { min: number, max: number }): number {
    return Math.max(range.min, Math.min(range.max, value));
  }
}
