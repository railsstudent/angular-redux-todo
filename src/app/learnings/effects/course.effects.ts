import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of, throwError as _throw } from "rxjs";
import { catchError, concatMap, delay, map, mergeMap } from "rxjs/operators";
import { DELAY_TIME } from "../../shared";
import * as courseActions from "../reducers/course.actions";

@Injectable()
export class CourseEffects {
  constructor(private actions$: Actions) {}

  addCourse$ = createEffect(() => this.actions$.pipe(
    ofType(courseActions.AddCourseAction),
    concatMap(({ payload: newCourse }) => {
      if (newCourse.name !== "Bad Course") {
        return of(newCourse).pipe(
          // waits 1 seconds before returing add course action
          delay(DELAY_TIME),
          map(payload => courseActions.AddCourseSuccessAction({ payload })),
          catchError(error =>
            of(courseActions.AddCourseFailedAction({ error }))
          )
        );
      }
      // Fake error message
      return _throw(`Unable to add course ${newCourse.name}`).pipe(
        catchError(error =>
          of(courseActions.AddCourseFailedAction({ error }))
        )
      );
    })
  ));

  deleteCourse$ = createEffect(() => this.actions$.pipe(
    ofType(courseActions.DeleteCourseAction),
    mergeMap(({ id: courseId }) => {
      if (courseId !== "1") {
        return of(courseId).pipe(
          delay(DELAY_TIME),
          map(id => courseActions.DeleteCourseSuccessAction({ id })),
          catchError(error =>
            of(courseActions.DeleteCourseFailedAction({ error }))
          )
        );
      }
      return _throw(`Unable to delete course id ${courseId}`).pipe(
        catchError(error =>
          of(courseActions.DeleteCourseFailedAction({ error }))
        )
      );
    })
  ));

  // update course effect
  updateCourse$ = createEffect(() => this.actions$.pipe(
    ofType(courseActions.UpdateCourseAction),
    concatMap(({ payload }) => {
      if (payload.id !== "1") {
        return of(payload).pipe(
          delay(DELAY_TIME),
          map(payload => courseActions.UpdateCourseSuccessAction({ payload })),
          catchError(error =>
            of(courseActions.UpdateCourseFailedAction({ error }))
          )
        );
      }
      return _throw(`Uable to update course ${payload.name}`).pipe(
        catchError(error =>
          of(courseActions.UpdateCourseFailedAction({ error }))
        )
      );
    })
  ));
}
