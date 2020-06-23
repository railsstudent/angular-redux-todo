import { createAction, props } from "@ngrx/store";
import { CourseModel } from "../models/";

export const AddCourseAction = createAction("[Course] ADD_COURSE", props<{ payload: CourseModel }>());

export const AddCourseSuccessAction = createAction("[Course] ADD_COURSE_SUCCESS",
  props<{ payload: CourseModel }>());

export const AddCourseFailedAction = createAction("[Course] ADD_COURSE_FAILED",
  props<{ error: string }>());

export const DeleteCourseAction = createAction("[Course] DELETE_COURSE",
  props<{ id: string }>());

export const DeleteCourseSuccessAction = createAction("[Course] DELETE_COURSE_SUCCESS",
  props<{ id: string }>());

export const DeleteCourseFailedAction = createAction("[Course] DELETE_COURSE_FAILED",
  props<{ error: string }>());

export const UPDATE_COURSE_FAILED = "[Course] UPDATE_COURSE_FAILED";

export const UpdateCourseAction = createAction("[Course] UPDATE_COURSE",
  props<{ payload: CourseModel }>());

export const UpdateCourseSuccessAction = createAction("[Course] UPDATE_COURSE_SUCCESS",
  props<{ payload: CourseModel }>());

export const UpdateCourseFailedAction = createAction("[Course] UPDATE_COURSE_FAILED",
  props<{ error: string }>());

export const SelectCourseAction = createAction("[Course] SELECT_COURSE", props<{ id: string }>());

export const DeleteCoursesByInstructor = createAction("[Course] DELETE_COURSES_BY_INSTRUCTOR",
  props<{ instructorId: string }>());
