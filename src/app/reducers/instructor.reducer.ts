import { createFeatureSelector, createSelector } from '@ngrx/store';
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
  entities: {
    '1': {
      id: '1',
      name: 'Kyle Simpson',
      description: 'Author of You Don\'t know JS Series'
    }
  },
  ids: ['1'],
  selectedInstructorId: null,
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
      const { id = '', name = '', description = '' } = action.payload || {};
      const changes = { name, description };
      const newState: InstructorState = instructorAdapter.updateOne({ id, changes }, state);
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

export const selectInstructorState = createFeatureSelector<InstructorState>('instructor');
export const selectCurrentInstructorId = createSelector(selectInstructorState,
  (state: InstructorState) => state.selectedInstructorId);

export const {
  // select the array of instructor ids
  selectIds: selectInstructorIds,

  // select the dictionary of instructor entities
  selectEntities: selectInstructorEntities,

  // select the array of instructors
  selectAll: selectAllInstructors,

  // select the total instructor count
  selectTotal: selectInstructorTotal
} = instructorAdapter.getSelectors(selectInstructorState);

// return current Instructor
export const selectCurrentInstructor = createSelector(selectInstructorEntities, selectCurrentInstructorId,
  (instructorEntities, instructorId) => instructorEntities[instructorId]);
