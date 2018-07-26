import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { TodoStore, selectTodoLoading } from './reducers';
import * as todoActions from './reducers/todo.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {
  title = 'Angular Todo App!';
  todoLoading$: any;

  constructor(private store: Store<TodoStore>) { }

  ngOnInit() {
    this.todoLoading$ = this.store.pipe(select(selectTodoLoading));
    this.store.dispatch(new todoActions.LoadTodosAction());
  }
}
