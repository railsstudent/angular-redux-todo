import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { TodoModel } from './model';
import * as fromTodo from '../reducers/todo.reducer';
import * as fromInstructor from '../reducers/instructor.reducer';

export interface AppStore {
  todo: TodoModel[],
  instructor: fromInstructor.InstructorState
};

export const reducers: ActionReducerMap<AppStore> = {
  todo: fromTodo.todoReducer,
  instructor: fromInstructor.instructorReducer
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
