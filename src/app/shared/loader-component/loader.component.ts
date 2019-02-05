import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "app-loader",
  template: `
    <div class="loading" *ngIf="condition">
      <img src="./assets/spinner.svg" />
    </div>
  `,
  styles: [
    `
      .loading {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 1000;
      }

      .loading:before {
        content: "";
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  @Input()
  condition = true;
}
