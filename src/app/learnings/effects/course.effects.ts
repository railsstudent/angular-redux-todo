import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, delay, mergeMap, concatMap } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';

import * as courseActions from '../reducers/course.actions';
import { DELAY_TIME } from '../../shared';
import { CourseModel } from '../models';

@Injectable()
export class CourseEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  addCourse$: Observable<Action> = this.actions$.pipe(
    ofType<courseActions.AddCourseAction>(courseActions.ADD_COURSE),
    map((action: courseActions.AddCourseAction) => action.payload),
    concatMap((newCourse: CourseModel) => {
      if (newCourse.name !== 'Bad Course') {
        return of(newCourse)
          .pipe(
            // waits 1 seconds before returing add course action
            delay(DELAY_TIME),
            map(data => new courseActions.AddCourseSuccessAction(data)),
            catchError(error => of(new courseActions.AddCourseFailedAction({ error })))
          );
      }
      // Fake error message
      return _throw(`Unable to add course ${newCourse.name}`)
        .pipe(
          catchError(error => of(new courseActions.AddCourseFailedAction({ error })))
        );
    })
  );

  @Effect()
  deleteCourse$: Observable<Action> = this.actions$.pipe(
      ofType<courseActions.DeleteCourseAction>(courseActions.DELETE_COURSE),
      map((action: courseActions.DeleteCourseAction) => action.payload.id),
      mergeMap((courseId: string) => {
        if (courseId !== '1') {
          return of(courseId)
            .pipe(
              delay(DELAY_TIME),
              map(id => new courseActions.DeleteCourseSuccessAction({ id })),
              catchError(error => of(new courseActions.DeleteCourseFailedAction({error})))
            );
        }
        return _throw(`Unable to delete course id ${courseId}`)
          .pipe(
            catchError(error => of(new courseActions.DeleteCourseFailedAction({error})))
          );
      })
    );

  // update course effect
  @Effect()
  updateCourse$: Observable<Action> = this.actions$.pipe(
      ofType<courseActions.UpdateCourseAction>(courseActions.UPDATE_COURSE),
      map((action: courseActions.UpdateCourseAction) => action.payload),
      concatMap((updatedCourse: CourseModel) => {
        if (updatedCourse.id !== '1') {
          return of(updatedCourse)
            .pipe(
              delay(DELAY_TIME),
              map(data => new courseActions.UpdateCourseSuccessAction(data)),
              catchError(error => of (new courseActions.UpdateCourseFailedAction({ error })))
            );
        }
        return _throw(`Uable to update course ${updatedCourse.name}`)
          .pipe(
            catchError(error => of (new courseActions.UpdateCourseFailedAction({ error })))
          );
      })
    );
}
