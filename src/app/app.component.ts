import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Dordrecht";
  subtitle = "door de jaren heen";
  buttonText = "Koop nu kaartjes";

  public scrollDown(): void {
    const introElement: HTMLElement = document.getElementsByClassName(
      "intro"
    )[0] as HTMLElement;
    const wrapperElement: HTMLElement = document.getElementsByClassName(
      "wrapper"
    )[0] as HTMLElement;
    wrapperElement.scroll({
      top: introElement.offsetHeight,
      left: window.scrollX,
      behavior: "smooth",
    });
  }
}
