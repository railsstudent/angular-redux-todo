import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ConfirmModalComponent } from "../confirm-modal/confirm-modal.component";
import { EditModalComponent } from "../edit-modal/edit-modal.component";
import { TodoModel } from "../models/";
import {
  selectAllTodos,
  selectCompletedTodos,
  selectCompletedTodosCount,
  selectPendingTodos,
  selectPendingTodosCount,
  selectTodoError,
  selectTodosTotal,
  TodoStore
} from "../reducers/";
import * as todoActions from "../reducers/todo.actions";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  todos$: Observable<TodoModel[]>;
  todosCount$: Observable<number>;
  completedTodosCount$: Observable<number>;
  pendingTodosCount$: Observable<number>;
  completedTodos$: Observable<TodoModel[]>;
  pendingTodos$: Observable<TodoModel[]>;
  todoError$: Observable<string>;

  constructor(
    private store: Store<TodoStore>,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.todos$ = this.store.pipe(select(selectAllTodos));
    this.todosCount$ = this.store.pipe(select(selectTodosTotal));
    this.completedTodos$ = this.store.pipe(select(selectCompletedTodos));
    this.pendingTodos$ = this.store.pipe(select(selectPendingTodos));
    this.completedTodosCount$ = this.store.pipe(
      select(selectCompletedTodosCount)
    );
    this.pendingTodosCount$ = this.store.pipe(select(selectPendingTodosCount));
    this.todoError$ = this.store.pipe(select(selectTodoError));
  }

  deleteTodo(id: string) {
    this.store.dispatch(todoActions.DeleteTodoAction({ id }));
  }

  updateTodo(payload: TodoModel) {
    this.store.dispatch(todoActions.UpdateTodoAction({ payload }));
  }

  toggleDone(todo: TodoModel) {
    const { done } = todo;
    const payload = { ...todo, done: !done };
    this.store.dispatch(todoActions.ToggleDoneAction({ payload }));
  }

  removeTodos() {
    this.store.dispatch(todoActions.RemoveTodosAction());
  }

  openAllRemove() {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message =
      "Are you sure to clear all todo items?";
    modalRef.componentInstance.title = "Remove all todo items";
    modalRef.result.then(() => this.removeTodos(), () => {});
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
}
