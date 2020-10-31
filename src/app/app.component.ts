import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title: string = 'Dordrecht';
  public subtitle: string = 'door de jaren heen';
  public buttonText: string = 'Koop nu kaartjes';

  public scrollDown(): void {
    const pageElements: HTMLElement[] = (Array.from(document.getElementsByClassName('page')) as HTMLElement[])
      .filter(page => !!page.offsetParent);
    const nextElement: HTMLElement = pageElements.filter(element => element.getBoundingClientRect().y > 0)[0];
    const wrapperElement: HTMLElement = document.getElementsByClassName(
      'body'
    )[0] as HTMLElement;
    wrapperElement.scroll({
      top: nextElement.getBoundingClientRect().y + wrapperElement.scrollTop,
      left: window.scrollX,
      behavior: 'smooth',
    });
  }
}
