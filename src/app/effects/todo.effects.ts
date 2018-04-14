import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, delay, concatMap, mergeMap } from 'rxjs/operators';

import * as todoActions from '../reducers/todo.actions';
import { TodoModel } from '../shared';

const DELAY_TIME = 1000;

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  addTodo$: Observable<Action> = this.actions$.pipe(
        ofType<todoActions.AddTodoAction>(todoActions.ADD_TODO),
        map((action: todoActions.AddTodoAction) => action.payload),
        concatMap((newTodo: TodoModel) =>
           of(newTodo)
            .pipe(
              // waits 1 seconds before returing add todo success action
              delay(DELAY_TIME),
              map(data => new todoActions.AddTodoSuccessAction(data)),
              catchError(error => of(new todoActions.AddTodoFailedAction({ error })))
            )
          )
      );

    @Effect()
    deleteTodo$: Observable<Action> = this.actions$.pipe(
        ofType<todoActions.DeleteTodoAction>(todoActions.DELETE_TODO),
        map((action: todoActions.DeleteTodoAction) => action.payload.id),
        mergeMap((todoId: string) =>
          of(todoId)
            .pipe(
              delay(DELAY_TIME),
              map(id => new todoActions.DeleteTodoSuccessAction({ id })),
              catchError(error => of(new todoActions.DeleteTodoFailedAction({ error })))
            )
        )
      );

      // update todo effect
      @Effect()
      updateTodo$: Observable<Action> = this.actions$.pipe(
          ofType<todoActions.UpdateTodoAction>(todoActions.UPDATE_TODO),
          map((action: todoActions.UpdateTodoAction) => action.payload),
          concatMap((todo: TodoModel) =>
             of(todo)
              .pipe(
                delay(DELAY_TIME),
                map(data => new todoActions.UpdateTodoSuccessAction(data)),
                catchError(error => of (new todoActions.UpdateTodoFailedAction({ error })))
              )
          )
        );

       // toggle done effect
       @Effect()
       toggleTodo$: Observable<Action> = this.actions$.pipe(
          ofType<todoActions.ToggleDoneAction>(todoActions.TOGGLE_DONE),
          map((action: todoActions.ToggleDoneAction) => action.payload),
          concatMap((todo: TodoModel) =>
            of(todo)
             .pipe(
               delay(DELAY_TIME),
               map(data => new todoActions.ToggleDoneSuccessAction(data)),
               catchError(error => of (new todoActions.ToggleDoneFailedAction({ error })))
             )
           )
        );

      // remove all todos
      @Effect()
      removeAll$: Observable<Action> = this.actions$.pipe(
        ofType<todoActions.RemoveTodosAction>(todoActions.REMOVE_TODOS),
        mergeMap(() =>
          of(null)
            .pipe(
              delay(DELAY_TIME),
              map(() => new todoActions.RemoveTodosSuccessAction()),
              catchError(error => of (new todoActions.RemoveTodosFailedAction({ error })))
            )
          )
        );
}
