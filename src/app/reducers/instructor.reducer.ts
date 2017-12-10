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
      return instructorAdapter.addOne(action.payload.instructor, state);
    case instructorActions.DELETE_INSTRUCTOR:
      return instructorAdapter.removeOne(action.payload.id, state);
    case instructorActions.UPDATE_INSTRUCTOR:
      return instructorAdapter.updateOne({ id: action.payload.id,
        changes: { name: action.payload.name, description: action.payload.description }
      }, state);
    default:
      return state;
  }
}
