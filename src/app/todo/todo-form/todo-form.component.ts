import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { TodoModel } from "../models/";
import { selectAllTodos, TodoStore } from "../reducers/";
import * as todoActions from "../reducers/todo.actions";

@Component({
  selector: "app-todo-form",
  templateUrl: "./todo-form.component.html",
  styleUrls: ["./todo-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent implements OnInit {
  todo$: Observable<TodoModel[]>;
  newTodo = "";

  constructor(private store: Store<TodoStore>) {}

  ngOnInit() {
    this.todo$ = this.store.pipe(select(selectAllTodos));
  }

  addTodo() {
    this.store.dispatch(
      new todoActions.AddTodoAction({
        value: this.newTodo,
        done: false
      })
    );
    this.newTodo = "";
  }
}
