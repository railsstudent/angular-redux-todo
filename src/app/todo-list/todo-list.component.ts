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
import { selectPendingTodosCount, selectCompletedTodosCount } from '../reducers/todo.reducer';
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

  constructor(private store: Store<AppStore>, private modalService: NgbModal) {}

  ngOnInit() {
    this.todos$ = this.store.select('todo');
    this.completedTodosCount$ = this.store.select(selectCompletedTodosCount);
    this.pendingTodosCount$ = this.store.select(selectPendingTodosCount);
  }

  deleteTodo(index) {
    this.store.dispatch(new todoActions.DeleteTodoAction({ index }));
  }

  updateTodo(newValue, index) {
    this.store.dispatch(new todoActions.UpdateTodoAction({ index, newValue }));
  }

  toggleDone(todo, index) {
    this.store.dispatch(new todoActions.ToggleDoneAction({index, done: !todo.done}));
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

  openConfirmDelete(todo: TodoModel, index: number) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = `Are you sure to delete "${todo.value}"?`;
    modalRef.componentInstance.title = 'Delete todo item';
    modalRef.result.then(() => this.deleteTodo(index), () => {});
  }

  openEdit(todo: TodoModel, index: number) {
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.todo = todo.value;
    modalRef.componentInstance.title = 'Edit todo item';
    modalRef.result.then(todo => this.updateTodo(todo, index), () => {});
  }

}
