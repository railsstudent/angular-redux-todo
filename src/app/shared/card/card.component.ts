import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef
} from "@angular/core";

@Component({
  selector: "app-card",
  template: `
    <div class="card-body">
      <div class="card-block">
        <h3 class="card-title">
          <ng-template [ngTemplateOutlet]="nameTemplateRef"></ng-template>
        </h3>
        <ng-template [ngTemplateOutlet]="blockTemplateRef"></ng-template>
      </div>
      <p class="card-text description">
        <ng-template [ngTemplateOutlet]="descriptionTemplateRef"></ng-template>
      </p>
      <ng-template [ngTemplateOutlet]="actionsTemplateRef"></ng-template>
    </div>
  `,
  styles: [
    `
      .description {
        white-space: pre-line;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input()
  blockTemplateRef: TemplateRef<any>;

  @Input()
  descriptionTemplateRef: TemplateRef<any>;

  @Input()
  nameTemplateRef: TemplateRef<any>;

  @Input()
  actionsTemplateRef: TemplateRef<any>;
}
