import { Action } from '@ngrx/store';
import { InstructorModel } from '../shared/';

export const ADD_INSTRUCTOR = '[Instructor] ADD_INSTRUCTOR';
export const DELETE_INSTRUCTOR = '[Instructor] DELETE_INSTRUCTOR';
export const UPDATE_INSTRUCTOR = '[Instructor] UPDATE_INSTRUCTOR';
export const SELECT_INSTRUCTOR = '[Instructor] SELECT_INSTRUCTOR';

export class AddInstructorAction implements Action {
    readonly type = ADD_INSTRUCTOR;
    constructor (public payload: InstructorModel) {}
}

export class DeleteInstructorAction implements Action {
    readonly type = DELETE_INSTRUCTOR;
    constructor (public payload: { id: string }) {}
}

export class UpdateInstructorAction implements Action {
    readonly type = UPDATE_INSTRUCTOR;
    constructor (public payload: { id: string, name: string, description: string }) {}
}

export class SelectInstructorAction implements Action {
    readonly type = SELECT_INSTRUCTOR;
    constructor (public payload: { id: string }) {}
}

export type InstructorActions = AddInstructorAction
  | DeleteInstructorAction
  | UpdateInstructorAction
  | SelectInstructorAction;
