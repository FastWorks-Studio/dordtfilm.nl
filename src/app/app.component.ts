import { OnInit, Component } from '@angular/core';
import { Scroll } from '@angular/router';

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

  private doParallax: boolean = true;

  private pageElements: PageElement[] = [];

  public ngOnInit(): void {
    this.pageElements = this.getActiveElements('page').map(page => { 
      return new PageElement(page)
    }) as PageElement[];
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
    this.updateParallax();
  }

  public scrollDown(): void {
    const pageElements: HTMLElement[] = (Array.from(document.getElementsByClassName('page')) as HTMLElement[]).filter(page => !!page.offsetParent);
    const nextElement: HTMLElement = pageElements.filter(element => element.getBoundingClientRect().y > 100)[0];
    if (!nextElement) { return; }
    window.scroll({
      top: nextElement.getBoundingClientRect().y + window.scrollY,
      left: window.scrollX,
      behavior: 'smooth',
    });
  }

  public onWindowScroll(event: Event): void {
    this.updateArrowAlpha();
    this.updateParallax();
  }

  private updateArrowAlpha(): void {
    const last: PageElement = this.pageElements[this.pageElements.length - 1];
    if (!last) { return; }
    const nextPage = last.page;
    const offset: number = nextPage.getBoundingClientRect().y;
    const height: number = nextPage.getBoundingClientRect().height;
    const alpha: number = Math.max(0, Math.min(150, offset - (height - 150)) / 150);
    this.arrowAlpha = alpha;
  }

  private updateParallax(): void {
    if (this.doParallax === false) { return; }
    this.pageElements.filter(this.isInViewport).forEach(page => {
      const rect: DOMRect = page.page.getBoundingClientRect();
      const offset: number = this.clamped(rect.y / rect.height, { min: -1, max: 1 });
      const absOffset: number = Math.abs(offset);
      const parallaxIntensity: number = 300;

      const textBlur = Math.min(1, absOffset * 4) * 3 + absOffset * 3;
      if (page.text) {
        page.text.style.transform = `translate3d(0px, ${offset * parallaxIntensity}px, 0px) scale(${(offset * -0.05) + 1})`
        // textElement.style.filter = `blur(${textBlur}px)`
      }

      if (page.image) {
        page.image.style.transform = `translate3d(0px, ${offset * -parallaxIntensity}px, 0px) scale(${1.1})`
        // if (textElement.className == 'page-logo') { return }
        // const imageBlur = (1 - Math.min(1, absOffset * 4)) * 5
        // imageElement.style.filter = `blur(${imageBlur}px)`
      }
    });
  }

  private isInViewport(element: PageElement): boolean {
    const rect: DOMRect = element.page.getBoundingClientRect();
    return rect.y >= -(rect.height * 1.1) && rect.y <= (rect.height * 1.1);
  }

  private clamped(value: number, range: { min: number, max: number }): number {
    return Math.max(range.min, Math.min(range.max, value));
  }

  private getActiveElements(id: string): HTMLElement[] {
    return (Array.from(document.getElementsByClassName(id)) as HTMLElement[])
      .filter(page => !!page.offsetParent);
  }
}

class PageElement {
  page: HTMLElement
  image: HTMLElement
  text: HTMLElement

  constructor(page: HTMLElement) {
    this.page = page;
    this.image = (Array.from(page.childNodes) as HTMLElement[]).find(e => e.className === 'page-background');
    this.text = (Array.from(page.childNodes) as HTMLElement[]).find(e => e.className === 'page-content' || e.className === 'page-logo');
  }
}