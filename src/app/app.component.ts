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

  private doParallax: boolean = false;

  public ngOnInit(): void {
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
    const isChrome = /chrome/i.test( navigator.userAgent );
    const isWindows = navigator.platform.indexOf('Win') > -1
    this.doParallax = isChrome && !isWindows;
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
    const pageElements = this.getActiveElements('page');
    const last: HTMLElement = pageElements[pageElements.length - 1];
    const offset: number = last.getBoundingClientRect().y;
    const height: number = last.getBoundingClientRect().height;
    const alpha: number = Math.max(0, Math.min(150, offset - (height - 150)) / 150);
    this.arrowAlpha = alpha;
  }

  private updateParallax(): void {
    if (this.doParallax === false) { return; }
    this.getActiveElements('page').filter(this.isInViewport).forEach(element => {
      const rect: DOMRect = element.getBoundingClientRect();
      const offset: number = this.clamped(rect.y / rect.height, { min: -1, max: 1 });
      const absOffset: number = Math.abs(offset);
      const parallaxIntensity: number = 200;

      const textBlur = Math.min(1, absOffset * 4) * 3 + absOffset * 3;
      const textElement = (Array.from(element.childNodes) as HTMLElement[]).find(e => e.className === 'page-content' || e.className === 'page-logo');
      if (textElement) { 
        textElement.style.transform = `translate(0px, ${offset * parallaxIntensity}px) scale(${(offset * -0.05) + 1})` 
        textElement.style.filter = `blur(${textBlur}px)` 
      }

      const imageElement = (Array.from(element.childNodes) as HTMLElement[]).find(e => e.className === 'page-background');
      if (imageElement) { 
        imageElement.style.transform = `translate(0px, ${offset * -parallaxIntensity}px) scale(${1.2})` 
        if (textElement.className == 'page-logo') { return }
        const imageBlur = (1 - Math.min(1, absOffset * 4)) * 5
        imageElement.style.filter = `blur(${imageBlur}px)` 
      }
    });
  }

  private isInViewport(element: HTMLElement): boolean {
    const rect: DOMRect = element.getBoundingClientRect();
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
