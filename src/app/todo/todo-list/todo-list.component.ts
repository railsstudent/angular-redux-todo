import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TodoModel } from '../models/';
import { todoStore, selectPendingTodos, selectCompletedTodos, selectAllTodos, selectTodosTotal,
  selectCompletedTodosCount, selectPendingTodosCount, selectTodoError
} from '../reducers/';
import * as todoActions from '../reducers/todo.actions';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
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

  constructor(private store: Store<todoStore>, private modalService: NgbModal) {}

  ngOnInit() {
    this.todos$ = this.store.pipe(select(selectAllTodos));
    this.todosCount$ = this.store.pipe(select(selectTodosTotal));
    this.completedTodos$ = this.store.pipe(select(selectCompletedTodos));
    this.pendingTodos$ = this.store.pipe(select(selectPendingTodos));
    this.completedTodosCount$ = this.store.pipe(select(selectCompletedTodosCount));
    this.pendingTodosCount$ = this.store.pipe(select(selectPendingTodosCount));
    this.todoError$ = this.store.pipe(select(selectTodoError));
  }

  deleteTodo(id) {
    this.store.dispatch(new todoActions.DeleteTodoAction({ id }));
  }

  updateTodo(todo: TodoModel) {
    const { id, value, done } = todo;
    this.store.dispatch(new todoActions.UpdateTodoAction({ id, value, done }));
  }

  toggleDone(todo: TodoModel) {
    const { id, value, done } = todo;
    this.store.dispatch(new todoActions.ToggleDoneAction({id, value, done: !done}));
  }

  removeTodos() {
    this.store.dispatch(new todoActions.RemoveTodosAction());
  }

  openAllRemove() {
     const modalRef = this.modalService.open(ConfirmModalComponent);
     modalRef.componentInstance.message = 'Are you sure to clear all todo items?';
     modalRef.componentInstance.title = 'Remove all todo items';
     modalRef.result.then(() => this.removeTodos(), () => {});
  }

  openConfirmDelete(todo: TodoModel) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = `Are you sure to delete "${todo.value}"?`;
    modalRef.componentInstance.title = 'Delete todo item';
    modalRef.result.then(() => this.deleteTodo(todo.id), () => {});
  }

  openEdit(todo: TodoModel) {
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.todo = todo.value;
    modalRef.componentInstance.title = 'Edit todo item';
    modalRef.result.then(newValue => this.updateTodo({
      id: todo.id,
      value: newValue,
      done: todo.done
    }), () => {});
  }
}
