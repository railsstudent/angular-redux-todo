import { Action } from '@ngrx/store';
import { CourseModel } from '../models/';

export const ADD_COURSE = '[Course] ADD_COURSE';
export const ADD_COURSE_SUCCESS = '[Course] ADD_COURSE_SUCCESS';
export const ADD_COURSE_FAILED = '[Course] ADD_COURSE_FAILED';
export const DELETE_COURSE = '[Course] DELETE_COURSE';
export const DELETE_COURSE_SUCCESS = '[Course] DELETE_COURSE_SUCCESS';
export const DELETE_COURSE_FAILED = '[Course] DELETE_COURSE_FAILED';
export const UPDATE_COURSE = '[Course] UPDATE_COURSE';
export const UPDATE_COURSE_SUCCESS = '[Course] UPDATE_COURSE_SUCCESS';
export const UPDATE_COURSE_FAILED = '[Course] UPDATE_COURSE_FAILED';
export const SELECT_COURSE = '[Course] SELECT_COURSE';

export class AddCourseAction implements Action {
    readonly type = ADD_COURSE;
    constructor (public payload: CourseModel) {}
}

export class AddCourseSuccessAction implements Action {
    readonly type = ADD_COURSE_SUCCESS;
    constructor (public payload: CourseModel) {}
}

export class AddCourseFailedAction implements Action {
    readonly type = ADD_COURSE_FAILED;
    constructor (public payload: { error: string }) {}
}

export class DeleteCourseAction implements Action {
    readonly type = DELETE_COURSE;
    constructor (public payload: { id: string }) {}
}

export class DeleteCourseSuccessAction implements Action {
    readonly type = DELETE_COURSE_SUCCESS;
    constructor (public payload: { id: string }) {}
}

export class DeleteCourseFailedAction implements Action {
    readonly type = DELETE_COURSE_FAILED;
    constructor (public payload: { error: string }) {}
}

export class UpdateCourseAction implements Action {
    readonly type = UPDATE_COURSE;
    constructor (public payload: CourseModel) {}
}

export class UpdateCourseSuccessAction implements Action {
    readonly type = UPDATE_COURSE_SUCCESS;
    constructor (public payload: CourseModel) {}
}

export class UpdateCourseFailedAction implements Action {
    readonly type = UPDATE_COURSE_FAILED;
    constructor (public payload: { error: string }) {}
}

export class SelectCourseAction implements Action {
    readonly type = SELECT_COURSE;
    constructor (public payload: { id: string }) {}
}

export type CourseActions =
    AddCourseAction
  | AddCourseSuccessAction
  | AddCourseFailedAction
  | DeleteCourseAction
  | DeleteCourseSuccessAction
  | DeleteCourseFailedAction
  | UpdateCourseAction
  | UpdateCourseSuccessAction
  | UpdateCourseFailedAction
  | SelectCourseAction;
