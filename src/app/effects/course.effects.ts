import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, delay, mergeMap } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';

import * as todoActions from '../reducers/todo.actions';
import * as courseActions from '../reducers/course.actions';
import { TodoModel, CourseModel } from '../shared';

const DELAY_TIME = 1000;

@Injectable()
export class CourseEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  addCourse$: Observable<Action> = this.actions$
    .ofType<courseActions.AddCourseAction>(courseActions.ADD_COURSE)
    .map((action: courseActions.AddCourseAction) => action.payload)
    .concatMap((newCourse: CourseModel) => {
      if (newCourse.name !== 'error') {
        return of(newCourse)
          .pipe(
            // waits 1 seconds before returing add course action
            delay(DELAY_TIME),
            map(data => new courseActions.AddCourseSuccessAction(data)),
            catchError(() => of(new courseActions.AddCourseFailedAction({ error: `Unable to add course ${newCourse.name}`})))
          );
      }
      // Fake error message
      return _throw(`Unable to add course ${newCourse.name}`)
        .pipe(
          catchError((error) => of(new courseActions.AddCourseFailedAction({ error })))
        );
    });

  @Effect()
  deleteCourse$: Observable<Action> = this.actions$
    .ofType<courseActions.DeleteCourseAction>(courseActions.DELETE_COURSE)
    .map((action: courseActions.DeleteCourseAction) => action.payload.id)
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
