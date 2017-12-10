import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';

import { ADD_TODO } from '../../reducers/todo.actions';
import { TodoModel, AppStore } from '../../shared/index';
import * as todoActions from '../../reducers/todo.actions';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todo$: Observable<TodoModel[]>;
  newTodo: string = '';

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.todo$ = this.store.select('todo');
  }

  addTodo() {
    this.store.dispatch(new todoActions.AddTodoAction({
      id: UUID.UUID(),
      value: this.newTodo,
      done: false
    }));
    this.newTodo = '';
  }
}
