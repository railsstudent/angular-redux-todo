import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { todoStore, selectTodoLoading } from './reducers';
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

  constructor(private store: Store<todoStore>) { }

  ngOnInit() {
    this.todoLoading$ = this.store.pipe(select(selectTodoLoading));
    this.store.dispatch(new todoActions.LoadTodosAction());
  }
}
