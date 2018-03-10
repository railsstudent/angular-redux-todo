import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';


export const GO = '[Router] Go';
export const INSTRUCTOR_DETAILS = '[Router] Instructor Details';

export class Go implements Action {
  readonly type = GO;

  constructor (public payload: {
    path: any[],
    query?: object;
    extras?: NavigationExtras
  }) {}
}

export class SelectedInstructor implements Action {
  readonly type = INSTRUCTOR_DETAILS;

  constructor (public payload: {
    instructorId: string
  }) {}
}

export type RouterActions = Go
  | SelectedInstructor;
