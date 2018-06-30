import { Injectable } from '@angular/core';
import { Observable ,  of ,  throwError as _throw } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, delay, mergeMap, concatMap } from 'rxjs/operators';

import { DELAY_TIME } from '../../shared';
import { InstructorModel } from '../models';
import * as instructorActions from '../reducers/instructor.actions';

@Injectable()
export class InstructorEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  addInstructor$: Observable<Action> = this.actions$.pipe(
      ofType<instructorActions.AddInstructorAction>(instructorActions.ADD_INSTRUCTOR),
      map((action: instructorActions.AddInstructorAction) => action.payload),
      mergeMap((newInstructor: InstructorModel) => {
        if (newInstructor.name !== 'Bad Instructor') {
          return of(newInstructor)
            .pipe(
              // waits 3 seconds before returing add instructor success action
              delay(DELAY_TIME),
              map(data => new instructorActions.AddInstructorSuccessAction(data)),
              catchError(error => of(new instructorActions.AddInstructorFailedAction({ error })))
            );
        }
        // Fake error message
        return _throw(`Unable to add instructor ${newInstructor.name}`)
          .pipe(
            catchError(error => of(new instructorActions.AddInstructorFailedAction({ error })))
          );
      })
    );

    @Effect()
    deleteInstructor$: Observable<Action> = this.actions$.pipe(
       ofType<instructorActions.DeleteInstructorAction>(instructorActions.DELETE_INSTRUCTOR),
       map((action: instructorActions.DeleteInstructorAction) => action.payload.id),
       mergeMap((instructorId: string) => {
        if (instructorId !== '1') {
          return of(instructorId)
            .pipe(
              delay(DELAY_TIME),
              map(id => new instructorActions.DeleteInstructorSuccessAction({ id })),
              catchError(error => of(new instructorActions.DeleteInstructorFailedAction({ error })))
            );
        }
        return _throw(`Unable to delete instructor id ${instructorId}`)
          .pipe(
            catchError(error => of(new instructorActions.DeleteInstructorFailedAction({ error })))
          );
      })
    );

    @Effect()
    updateInstructor$: Observable<Action> = this.actions$.pipe(
        ofType<instructorActions.UpdateInstructorAction>(instructorActions.UPDATE_INSTRUCTOR),
        map((action: instructorActions.UpdateInstructorAction) => action.payload),
        concatMap((updatedInstructor: InstructorModel) => {
          if (updatedInstructor.id !== '1') {
            return of(updatedInstructor)
              .pipe(
                delay(DELAY_TIME),
                map(data => new instructorActions.UpdateInstructorSuccessAction(data)),
                catchError(error => of (new instructorActions.UpdateInstructorFailedAction({ error })))
              );
          }
          return _throw(`Uable to update instructor ${updatedInstructor.name}`)
            .pipe(
              catchError(error => of (new instructorActions.UpdateInstructorFailedAction({ error })))
            );
        })
      );
}
