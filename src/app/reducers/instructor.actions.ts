import { Action } from '@ngrx/store';
import { InstructorModel } from '../shared/';

export const ADD_INSTRUCTOR = 'ADD_INSTRUCTOR';
export const DELETE_INSTRUCTOR = 'DELETE_INSTRUCTOR';
export const UPDATE_INSTRUCTOR = 'UPDATE_INSTRUCTOR';

export class AddInstructorAction implements Action {
    readonly type = ADD_INSTRUCTOR;
    constructor (public payload: { instructor: InstructorModel }) {}
}

export class DeleteInstructorAction implements Action {
    readonly type = DELETE_INSTRUCTOR;
    constructor (public payload: { id: string }) {}
}

export class UpdateInstructorAction implements Action {
    readonly type = UPDATE_INSTRUCTOR;
    constructor (public payload: { id: string, name: string, description: string }) {}
}

export type InstructorActions = AddInstructorAction | DeleteInstructorAction | UpdateInstructorAction;
