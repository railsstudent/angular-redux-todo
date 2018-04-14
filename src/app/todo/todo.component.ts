import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { selectTodoLoading, AppStore } from '../reducers';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoComponent implements OnInit {
  title = 'Angular Todo App!';
  todoLoading$: any;

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.todoLoading$ = this.store.pipe(select(selectTodoLoading));
  }
}
