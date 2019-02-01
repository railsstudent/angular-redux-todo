import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from "../confirm-modal/confirm-modal.component";

@Component({
  selector: "todo-summary",
  templateUrl: "./todo-summary.component.html",
  styleUrls: ["./todo-summary.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoSummaryComponent {
  @Input()
  todosCount: number;
  @Input()
  pendingTodosCount: number;
  @Input()
  completedTodosCount: number;

  @Output()
  removeTodos = new EventEmitter();

  constructor(private modalService: NgbModal) {}

  openAllRemove() {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message =
      "Are you sure to clear all todo items?";
    modalRef.componentInstance.title = "Remove all todo items";
    modalRef.result.then(() => this.removeTodos.emit(), () => {});
  }
}
