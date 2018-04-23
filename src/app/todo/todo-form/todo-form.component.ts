import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { ADD_TODO } from '../reducers/todo.actions';
import { TodoModel } from '../models/';
import { todoStore, selectAllTodos } from '../reducers/';
import * as todoActions from '../reducers/todo.actions';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent implements OnInit {
  todo$: Observable<TodoModel[]>;
  newTodo: string = '';

  constructor(private store: Store<todoStore>) { }

  ngOnInit() {
    this.todo$ = this.store.pipe(select(selectAllTodos));
  }

  addTodo() {
    this.store.dispatch(new todoActions.AddTodoAction({
      value: this.newTodo,
      done: false
    }));
    this.newTodo = '';
  }
}
