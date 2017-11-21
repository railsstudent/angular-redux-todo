import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { TodoModel, AppStore } from './shared/index';
import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  TOGGLE_DONE,
  GET_TODOS,
  REMOVE_TODOS
} from './reducers/todo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular + Redux Todo App';
  todos$: Observable<any>;
  todo: string = '';
  editing: boolean = false;
  indexToEdit: number | null;

  constructor(private titleService: Title, private store: Store<AppStore>) {
    titleService.setTitle(this.title);
  }

  ngOnInit() {
    this.todos$ = this.store.select('todoReducer');
  }

  addTodo(value) {
    this.store.dispatch({ type: ADD_TODO, payload: { value, done: false } });
  }

  deleteTodo(index) {
    this.store.dispatch({ type: DELETE_TODO, payload: { index } });
  }

  editTodo(todo, index) {
     this.editing = true;
     this.todo = todo.value;
     this.indexToEdit = index;
   }

   cancelEdit() {
     this.editing = false;
     this.todo = '';
     this.indexToEdit = null;
   }

  updateTodo(newValue) {
    this.store.dispatch({ type: UPDATE_TODO, payload: { index: this.indexToEdit, newValue } });
  }

  toggleDone(todo, index) {
    this.store.dispatch({ type: TOGGLE_DONE, payload: { index, done: !todo.done } });
  }

  getTodos() {
    this.store.dispatch({ type: GET_TODOS, payload: [] });
  }

  removeTodos() {
    this.store.dispatch({ type: REMOVE_TODOS, payload: [] });
  }

}
