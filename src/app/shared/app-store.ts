import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { TodoModel } from './model';
import * as fromTodo from '../reducers/todo.reducer';
import * as fromInstructor from '../reducers/instructor.reducer';
import * as fromCourse from '../reducers/course.reducer';

export interface AppStore {
  todo: TodoModel[],
  instructor: fromInstructor.InstructorState,
  course: fromCourse.CourseState
};

export const reducers: ActionReducerMap<AppStore> = {
  todo: fromTodo.todoReducer,
  instructor: fromInstructor.instructorReducer,
  course: fromCourse.courseReducer
};

// Selector
export const selectTodos = (state: AppStore) => state.todo;
export const selectCompletedTodos = createSelector(selectTodos,
  (todos: TodoModel[]) => todos.filter(todo => todo.done === true));
export const selectPendingTodos = createSelector(selectTodos,
  (todos: TodoModel[]) => todos.filter(todo => todo.done === false));

export const selectInstructorState = createFeatureSelector<fromInstructor.InstructorState>('instructor');
export const selectCurrentInstructorId = createSelector(selectInstructorState,
  (state: fromInstructor.InstructorState) => state.selectedInstructorId);

export const {
  // select the array of instructor ids
  selectIds: selectInstructorIds,

  // select the dictionary of instructor entities
  selectEntities: selectInstructorEntities,

  // select the array of instructors
  selectAll: selectAllInstructors,

  // select the total instructor count
  selectTotal: selectInstructorTotal
} = fromInstructor.instructorAdapter.getSelectors(selectInstructorState);

// return Instructor
export const selectCurrentInstructor = createSelector(selectInstructorEntities, selectCurrentInstructorId,
  (instructorEntities, instructorId) => instructorEntities[instructorId]);

export const selectCourseState = createFeatureSelector<fromCourse.CourseState>('course');
export const selectCurrentCourseId = createSelector(selectCourseState,
  (state: fromCourse.CourseState) => state.selectedCourseId);

export const {
  // select the array of course ids
  selectIds: selectCourseIds,
  // select the dictionary of course entities
  selectEntities: selectCourseEntities,
  // select the array of courses
  selectAll: selectAllCourses,
  // select the total course count
  selectTotal: selectCourseTotal
} = fromCourse.courseAdapter.getSelectors(selectCourseState);

// return Course
export const selectCurrentCourse = createSelector(selectCourseEntities, selectCurrentCourseId,
  (courseEntities, courseId) => courseEntities[courseId]);
