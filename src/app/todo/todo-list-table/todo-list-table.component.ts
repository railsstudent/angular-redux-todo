import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import { ConfirmModalComponent } from "../confirm-modal/confirm-modal.component";
import { EditModalComponent } from "../edit-modal/edit-modal.component";
import { TodoModel } from "../models";
import { TodoStore } from "../reducers";
import * as todoActions from "../reducers/todo.actions";

@Component({
  selector: "todo-list-table",
  templateUrl: "./todo-list-table.component.html",
  styleUrls: ["./todo-list-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListTableComponent {
  @Input()
  todos: TodoModel[];

  constructor(
    private store: Store<TodoStore>,
    private modalService: NgbModal
  ) {}

  toggleDone(todo: TodoModel) {
    const { id, value, done } = todo;
    this.store.dispatch(
      new todoActions.ToggleDoneAction({ id, value, done: !done })
    );
  }

  openConfirmDelete(todo: TodoModel) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = `Are you sure to delete "${
      todo.value
    }"?`;
    modalRef.componentInstance.title = "Delete todo item";
    modalRef.result.then(() => this.deleteTodo(todo.id), () => {});
  }

  openEdit(todo: TodoModel) {
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.todo = todo.value;
    modalRef.componentInstance.title = "Edit todo item";
    modalRef.result.then(
      newValue =>
        this.updateTodo({
          id: todo.id,
          value: newValue,
          done: todo.done
        }),
      () => {}
    );
  }

  deleteTodo(id) {
    this.store.dispatch(new todoActions.DeleteTodoAction({ id }));
  }

  updateTodo(todo: TodoModel) {
    const { id, value, done } = todo;
    this.store.dispatch(new todoActions.UpdateTodoAction({ id, value, done }));
  }
}
