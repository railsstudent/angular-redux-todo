import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, delay } from 'rxjs/operators';

import * as todoActions from '../reducers/todo.actions';
import * as courseActions from '../reducers/course.actions';
import { TodoModel } from '../shared';

const DELAY_TIME = 1000;

@Injectable()
export class CourseEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  addCourse$: Observable<Action> = this.actions$
    .ofType<todoActions.AddTodoAction>(todoActions.ADD_TODO)
    .map((action: todoActions.AddTodoAction) => action.payload)
    .concatMap((newTodo: TodoModel) => {
      return of(newTodo)
        .pipe(
          // waits 1 seconds before returing add todo success action
          delay(DELAY_TIME),
          map(data => new todoActions.AddTodoSuccessAction(data)),
          catchError(() => of(new todoActions.AddTodoFailedAction()))
        );
    });

  @Effect()
  deleteCourse$: Observable<Action> = this.actions$
    .ofType<todoActions.DeleteTodoAction>(todoActions.DELETE_TODO)
    .map((action: todoActions.DeleteTodoAction) => action.payload.id)
    .mergeMap((todoId: string) => {
      return of(todoId)
        .pipe(
          delay(DELAY_TIME),
          map(id => new todoActions.DeleteTodoSuccessAction({ id })),
          catchError(() => of(new todoActions.DeleteTodoFailedAction()))
        );
    });

  // update todo effect and toggle done effect
  @Effect()
  updateCourse$: Observable<Action> = this.actions$
    .ofType<todoActions.UpdateTodoAction>(todoActions.UPDATE_TODO, todoActions.TOGGLE_DONE)
    .map((action: todoActions.UpdateTodoAction) => action.payload)
    .concatMap((todo: TodoModel) => {
      return of(todo)
        .pipe(
          delay(DELAY_TIME),
          map(data => new todoActions.UpdateTodoSuccessAction(data)),
          catchError(() => of (new todoActions.UpdateTodoFailedAction()))
        );
   });
}
