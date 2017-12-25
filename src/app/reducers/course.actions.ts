import { Action } from '@ngrx/store';
import { CourseModel } from '../shared/';

export const ADD_COURSE = '[Course] ADD_COURSE';
export const DELETE_COURSE = '[Course] DELETE_COURSE';
export const UPDATE_COURSE = '[Course] UPDATE_COURSE';
export const SELECT_COURSE = '[Course] SELECT_COURSE';
export const DELETE_COURSES_By_INSTRUCTOR = '[Course] DELETE_COURSES_By_INSTRUCTOR';

export class AddCourseAction implements Action {
    readonly type = ADD_COURSE;
    constructor (public payload: CourseModel) {}
}

export class DeleteCourseAction implements Action {
    readonly type = DELETE_COURSE;
    constructor (public payload: { id: string }) {}
}

export class UpdateCourseAction implements Action {
    readonly type = UPDATE_COURSE;
    constructor (public payload: { id: string, name: string, description: string, instructorId: string }) {}
}

export class SelectCourseAction implements Action {
    readonly type = SELECT_COURSE;
    constructor (public payload: { id: string }) {}
}

export class DeleteCoursesByInstructorAction implements Action {
    readonly type = DELETE_COURSES_By_INSTRUCTOR;
    constructor (public payload: { instructorId: string }) {}
}


export type CourseActions = AddCourseAction
  | DeleteCourseAction
  | UpdateCourseAction
  | SelectCourseAction
  | DeleteCoursesByInstructorAction;
