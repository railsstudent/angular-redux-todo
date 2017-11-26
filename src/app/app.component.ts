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
    this.cancelEdit();
  }

  editTodo(todo, index) {
     this.editing = true;
     this.modTodo = todo.value;
     this.indexToEdit = index;
   }

   cancelEdit() {
     this.editing = false;
     this.modTodo = '';
     this.indexToEdit = null;
   }

  updateTodo(newValue) {
    this.store.dispatch({ type: UPDATE_TODO, payload: { index: this.indexToEdit, newValue } });
    this.cancelEdit();
  }

  toggleDone(todo, index) {
    this.store.dispatch({ type: TOGGLE_DONE, payload: { index, done: !todo.done } });
    this.cancelEdit();
  }

  removeTodos() {
    this.store.dispatch({ type: REMOVE_TODOS, payload: [] });
    this.cancelEdit();
  }

  isEditingRow(index) {
    return this.editing && index === this.indexToEdit;
  }

  open(content) {
    this.modalService.open(content).result.then(result => {
       if (result === 'ConfirmRemoveAll') {
          this.removeTodos();
       }
     }, () => {});
  }

  openAllRemove() {
     const modalRef = this.modalService.open(ConfirmModalComponent);
     modalRef.componentInstance.message = 'Are you sure to clear all todo items?';
     modalRef.componentInstance.title = 'Remove all todo items';
     modalRef.result.then(result => {
       if (result === 'Confirm') {
         this.removeTodos();
       }
     }, () => {});
  }

  openConfirmDelete(todo: TodoModel, index: number) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = `Are you sure to delete "${todo.value}"?`;
    modalRef.componentInstance.title = 'Delete todo item';
    modalRef.result.then(result => {
      if (result === 'Confirm') {
        this.deleteTodo(index);
      }
    }, () => {});
  }
}
