import { Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { InstructorModel, AppStore } from '../shared/';
import * as instructorActions from './instructor.actions';

export interface InstructorState extends EntityState<InstructorModel> {
  // additional entities state properties
  selectedInstructorId: string | null;
};
export const instructorAdapter: EntityAdapter<InstructorModel> = createEntityAdapter<InstructorModel>();
export const initialState: InstructorState = instructorAdapter.getInitialState({
  // additional entities state properties
  selectedInstructorId: null
});

export function instructorReducer(state: InstructorState = initialState,
  action: instructorActions.InstructorActions) {
  switch (action.type) {
    case instructorActions.ADD_INSTRUCTOR:
      return {
        ...instructorAdapter.addOne(action.payload, state),
        selectedInstructorId: null
      };
    case instructorActions.DELETE_INSTRUCTOR:
      return {
        ...instructorAdapter.removeOne(action.payload.id, state),
        selectedInstructorId: (action.payload.id != state.selectedInstructorId) ? state.selectedInstructorId : null
      }
    case instructorActions.UPDATE_INSTRUCTOR:
      const changedInstructor = {
          name: action.payload.name,
          description: action.payload.description
      };
      const newState: InstructorState = instructorAdapter.updateOne(
        { id: action.payload.id,
          changes: changedInstructor
        }, state);

      return {
        ...newState,
        selectedInstructorId: null
      };
    case instructorActions.SELECT_INSTRUCTOR:
      return {
        ...state,
        selectedInstructorId: action.payload.id
      };
    default:
      return state;
  }
}
