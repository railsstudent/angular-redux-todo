import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { selectTodoLoading, TodoStore } from "./reducers";
import * as todoActions from "./reducers/todo.actions";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {
  title = "Angular Todo App!";
  todoLoading$: any;

  constructor(private store: Store<TodoStore>) {}

  ngOnInit() {
    this.todoLoading$ = this.store.pipe(select(selectTodoLoading));
    this.store.dispatch(new todoActions.LoadTodosAction());
  }
}
