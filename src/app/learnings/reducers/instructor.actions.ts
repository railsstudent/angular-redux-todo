import { Action } from '@ngrx/store';
import { InstructorModel } from '../models/';

export const ADD_INSTRUCTOR = '[Instructor] ADD_INSTRUCTOR';
export const ADD_INSTRUCTOR_SUCCESS = '[Instructor] ADD_INSTRUCTOR_SUCCESS';
export const ADD_INSTRUCTOR_FAILED = '[Instructor] ADD_INSTRUCTOR_FAILED';
export const DELETE_INSTRUCTOR = '[Instructor] DELETE_INSTRUCTOR';
export const DELETE_INSTRUCTOR_SUCCESS = '[Instructor] DELETE_INSTRUCTOR_SUCCESS';
export const DELETE_INSTRUCTOR_FAILED = '[Instructor] DELETE_INSTRUCTOR_FAILED';
export const UPDATE_INSTRUCTOR = '[Instructor] UPDATE_INSTRUCTOR';
export const UPDATE_INSTRUCTOR_SUCCESS = '[Instructor] UPDATE_INSTRUCTOR_SUCCESS';
export const UPDATE_INSTRUCTOR_FAILED = '[Instructor] UPDATE_INSTRUCTOR_FAILED';
export const SELECT_INSTRUCTOR = '[Instructor] SELECT_INSTRUCTOR';

export class AddInstructorAction implements Action {
    readonly type = ADD_INSTRUCTOR;
    constructor (public payload: InstructorModel) {}
}

export class AddInstructorSuccessAction implements Action {
    readonly type = ADD_INSTRUCTOR_SUCCESS;
    constructor (public payload: InstructorModel) {}
}

export class AddInstructorFailedAction implements Action {
    readonly type = ADD_INSTRUCTOR_FAILED;
    constructor (public payload: { error: string }) {}
}

export class DeleteInstructorAction implements Action {
    readonly type = DELETE_INSTRUCTOR;
    constructor (public payload: { id: string }) {}
}

export class DeleteInstructorSuccessAction implements Action {
    readonly type = DELETE_INSTRUCTOR_SUCCESS;
    constructor (public payload: { id: string }) {}
}

export class DeleteInstructorFailedAction implements Action {
    readonly type = DELETE_INSTRUCTOR_FAILED;
    constructor (public payload: { error: string }) {}
}

export class UpdateInstructorAction implements Action {
    readonly type = UPDATE_INSTRUCTOR;
    constructor (public payload: InstructorModel) {}
}

export class UpdateInstructorSuccessAction implements Action {
    readonly type = UPDATE_INSTRUCTOR_SUCCESS;
    constructor (public payload: InstructorModel) {}
}

export class UpdateInstructorFailedAction implements Action {
    readonly type = UPDATE_INSTRUCTOR_FAILED;
    constructor (public payload: { error: string }) {}
}

export class SelectInstructorAction implements Action {
    readonly type = SELECT_INSTRUCTOR;
    constructor (public payload: { id: string }) {}
}

export type InstructorActions = AddInstructorAction
  | AddInstructorSuccessAction
  | AddInstructorFailedAction
  | DeleteInstructorAction
  | DeleteInstructorSuccessAction
  | DeleteInstructorFailedAction
  | UpdateInstructorAction
  | UpdateInstructorSuccessAction
  | UpdateInstructorFailedAction
  | SelectInstructorAction;
