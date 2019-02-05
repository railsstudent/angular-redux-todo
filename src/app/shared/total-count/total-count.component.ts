import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef
} from "@angular/core";

@Component({
  selector: "app-total-count",
  template: `
    <div class="row summary-bg text-white">
      <ng-template [ngTemplateOutlet]="templateRef"> </ng-template>
    </div>
  `,
  styles: [
    `
      .summary-bg {
        background: deeppink !important;
        padding: 0.25rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalCountComponent {
  @Input() templateRef: TemplateRef<any>;
}
