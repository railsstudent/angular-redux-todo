import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, delay, merge } from 'rxjs/operators';

import * as todoActions from '../reducers/todo.actions';
import { TodoModel } from '../shared';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions) {

  }

  @Effect()
  addTodo$: Observable<Action> = this.actions$
    .ofType<todoActions.AddTodoAction>(todoActions.ADD_TODO)
    .map((action: todoActions.AddTodoAction) => action.payload)
    .mergeMap((newTodo: TodoModel) => {
      return of(newTodo)
        .pipe(
          // waits 3 seconds before returing add todo success action
          delay(3000),
          map(data => new todoActions.AddTodoSuccessAction(data)),
          catchError(() => of(new todoActions.AddTodoFailedAction()))
        );
    });

    @Effect()
    deleteTodo$: Observable<Action> = this.actions$
      .ofType<todoActions.DeleteTodoAction>(todoActions.DELETE_TODO)
      .map((action: todoActions.DeleteTodoAction) => action.payload.id)
      .mergeMap((todoId: string) => {
        return of(todoId)
          .pipe(
            delay(3000),
            map(id => new todoActions.DeleteTodoSuccessAction({ id })),
            catchError(() => of(new todoActions.DeleteTodoFailedAction()))
          );
      });
}
