import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { UUID } from "angular2-uuid";
import { of } from "rxjs";
import {
  catchError,
  concatMap,
  delay,
  map,
  mergeMap,
  switchMap
} from "rxjs/operators";
import { DELAY_TIME } from "../../shared";
import * as todoActions from "../reducers/todo.actions";
import { TodoService } from "../services";

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.LoadTodosAction),
      switchMap(() => {
        return this.todoService.get().pipe(
          delay(DELAY_TIME),
          map(payload => todoActions.LoadTodosSuccessAction({ payload })),
          catchError(error => of(todoActions.LoadTodosFailedAction({ error })))
        );
      })
    )
  );

  addTodo$ = createEffect(() => this.actions$.pipe(
    ofType(todoActions.AddTodoAction),
    concatMap(({ value, done }) =>
      this.todoService.add({ id: UUID.UUID(), value, done }).pipe(
        // waits 1 seconds before returing add todo success action
        delay(DELAY_TIME),
        map(payload => todoActions.AddTodoSuccessAction({ payload })),
        catchError(error => of(todoActions.AddTodoFailedAction({ error })))
      )
    )
  ));

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.DeleteTodoAction),
      mergeMap(({ id: todoId }) =>
        this.todoService.remove(todoId).pipe(
          delay(DELAY_TIME),
          map(id => todoActions.DeleteTodoSuccessAction({ id })),
          catchError(error =>
            of(todoActions.DeleteTodoFailedAction({ error }))
          )
        )
      )
    ));

  // update todo effect
  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.UpdateTodoAction),
      concatMap(({ payload: todo }) =>
        this.todoService.update(todo).pipe(
          delay(DELAY_TIME),
          map(payload => todoActions.UpdateTodoSuccessAction({ payload })),
          catchError(error =>
            of(todoActions.UpdateTodoFailedAction({ error }))
          )
        )
      )
    ));

  // toggle done effect
  toggleTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.ToggleDoneAction),
      concatMap(({ payload: todo }) =>
        this.todoService.update(todo).pipe(
          delay(DELAY_TIME),
          map(payload => todoActions.ToggleDoneSuccessAction({ payload })),
          catchError(error =>
            of(todoActions.ToggleDoneFailedAction({ error }))
          )
        )
      )
    ));

  // remove all todos
  removeAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.RemoveTodosAction),
      mergeMap(() =>
        this.todoService.removeAll().pipe(
          delay(DELAY_TIME),
          map(() => todoActions.RemoveTodosSuccessAction()),
          catchError(error =>
            of(todoActions.RemoveTodosFailedAction({ error }))
          )
        )
      )
    ));
}
