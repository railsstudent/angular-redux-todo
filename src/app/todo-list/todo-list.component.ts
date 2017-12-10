import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TodoModel, AppStore } from '../shared/index';
import {
  DELETE_TODO,
  UPDATE_TODO,
  TOGGLE_DONE,
  REMOVE_TODOS
} from '../reducers/todo.actions';
import * as todoActions from '../reducers/todo.actions';
import { selectPendingTodos, selectCompletedTodos } from '../reducers/todo.reducer';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoListComponent implements OnInit {
  todos$: Observable<TodoModel[]>;
  completedTodosCount$ : Observable<number>;
  pendingTodosCount$ : Observable<number>;
  completedTodos$: Observable<TodoModel[]>;
  pendingTodos$: Observable<TodoModel[]>;

  constructor(private store: Store<AppStore>, private modalService: NgbModal) {}

  ngOnInit() {
    this.todos$ = this.store.select('todo');
    this.completedTodos$ = this.store.select(selectCompletedTodos);
    this.pendingTodos$ = this.store.select(selectPendingTodos);
  }

  deleteTodo(id) {
    this.store.dispatch(new todoActions.DeleteTodoAction({ id }));
  }

  updateTodo(id, newValue) {
    this.store.dispatch(new todoActions.UpdateTodoAction({ id, newValue }));
  }

  toggleDone(todo) {
    this.store.dispatch(new todoActions.ToggleDoneAction({id: todo.id, done: !todo.done}));
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
    modalRef.result.then(newValue => this.updateTodo(todo.id, newValue), () => {});
  }

}
