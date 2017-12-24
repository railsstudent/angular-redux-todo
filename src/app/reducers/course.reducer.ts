import { Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CourseModel, AppStore } from '../shared/';
import * as courseActions from './course.actions';

export interface CourseState extends EntityState<CourseModel> {
  // additional entities state properties
  selectedCourseId: string | null
};
export const courseAdapter: EntityAdapter<CourseModel> = createEntityAdapter<CourseModel>();
export const initialCourseState: CourseState = courseAdapter.getInitialState({
  selectedCourseId: null
});

export function courseReducer(state: CourseState = initialCourseState,
  action: courseActions.CourseActions) {
  switch (action.type) {
    case courseActions.ADD_COURSE:
      return {
        ...courseAdapter.addOne(action.payload, state),
        selectedCourseId: null
      };
    case courseActions.DELETE_COURSE:
      return {
        ...courseAdapter.removeOne(action.payload.id, state),
        selectedCourseId: (action.payload.id != state.selectedCourseId) ? state.selectedCourseId : null
      }
    case courseActions.UPDATE_COURSE:
      const { id = '', name = '', description = '', instructorId = '' } = action.payload || {};
      const changes = { name, description, instructorId };
      const newState: CourseState = courseAdapter.updateOne({ id, changes }, state);
      return {
        ...newState,
        selectedCourseId: null
      };
    case courseActions.SELECT_COURSE:
      return {
        ...state,
        selectedCourseId: action.payload.id
      };
    default:
      return state;
  }
}
