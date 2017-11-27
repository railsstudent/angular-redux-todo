import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TodoModel, AppStore } from './shared/index';
import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  TOGGLE_DONE,
  REMOVE_TODOS
} from './reducers/todo.actions';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular + Redux Todo App';
  todos$: Observable<TodoModel[]>;
  newTodo: string = '';
  modTodo: string = '';
  editing: boolean = false;
  indexToEdit: number | null;

  constructor(private titleService: Title,
    private store: Store<AppStore>, private modalService: NgbModal) {
    titleService.setTitle(this.title);
  }

  ngOnInit() {
    this.todos$ = this.store.select('todoReducer');
  }

  addTodo() {
    this.store.dispatch({ type: ADD_TODO, payload: { value: this.newTodo, done: false } });
    this.newTodo = '';
  }

  deleteTodo(index) {
    this.store.dispatch({ type: DELETE_TODO, payload: { index } });
  }

  updateTodo(newValue, index) {
    this.store.dispatch({ type: UPDATE_TODO, payload: { index, newValue } });
  }

  toggleDone(todo, index) {
    this.store.dispatch({ type: TOGGLE_DONE, payload: { index, done: !todo.done } });
  }

  removeTodos() {
    this.store.dispatch({ type: REMOVE_TODOS, payload: [] });
  }

  isEditingRow(index) {
    return this.editing && index === this.indexToEdit;
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
