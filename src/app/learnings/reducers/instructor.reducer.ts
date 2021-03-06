import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InstructorModel } from "../models/";
import * as instructorActions from "./instructor.actions";

export interface InstructorState extends EntityState<InstructorModel> {
  // additional entities state properties
  selectedInstructorId: string | null;
  loading: boolean;
  error: string | null;
}
export const instructorAdapter: EntityAdapter<
  InstructorModel
> = createEntityAdapter<InstructorModel>();
export const initialState: InstructorState = instructorAdapter.getInitialState({
  // additional entities state properties
  entities: {
    "1": {
      id: "1",
      name: "Kyle Simpson",
      description: "Author of You Don't know JS Series"
    },
    "2": {
      id: "2",
      name: "Sarah Drasner",
      description: "Speaker, designer, author and Vue evangelist"
    }
  },
  ids: ["1", "2"],
  selectedInstructorId: null,
  loading: false,
  error: null
});

export function instructorReducer(
  state: InstructorState = initialState,
  action: instructorActions.InstructorActions
) {
  switch (action.type) {
    case instructorActions.ADD_INSTRUCTOR:
    case instructorActions.DELETE_INSTRUCTOR:
    case instructorActions.UPDATE_INSTRUCTOR:
      return {
        ...state,
        loading: true,
        error: null
      };
    case instructorActions.ADD_INSTRUCTOR_FAILED:
    case instructorActions.DELETE_INSTRUCTOR_FAILED:
    case instructorActions.UPDATE_INSTRUCTOR_FAILED:
      const { error = null } = action.payload || {};
      return {
        ...state,
        selectedInstructorId: null,
        loading: false,
        error
      };
    case instructorActions.ADD_INSTRUCTOR_SUCCESS:
      return {
        ...instructorAdapter.addOne(action.payload, state),
        selectedInstructorId: null,
        loading: false,
        error: null
      };
    case instructorActions.DELETE_INSTRUCTOR_SUCCESS:
      return {
        ...instructorAdapter.removeOne(action.payload.id, state),
        selectedInstructorId:
          action.payload.id !== state.selectedInstructorId
            ? state.selectedInstructorId
            : null,
        loading: false,
        error: null
      };
    case instructorActions.UPDATE_INSTRUCTOR_SUCCESS:
      const { id = "", name = "", description = "" } = action.payload || {};
      const changes = { name, description };
      const newState: InstructorState = instructorAdapter.updateOne(
        { id, changes },
        state
      );
      return {
        ...newState,
        selectedInstructorId: null,
        loading: false,
        error: null
      };
    case instructorActions.SELECT_INSTRUCTOR:
      return {
        ...state,
        selectedInstructorId: action.payload.id,
        loading: false,
        error: null
      };
    default:
      return {
        ...state,
        loading: false,
        error: null
      };
  }
}

export const selectInstructorState = createFeatureSelector<InstructorState>(
  "instructor"
);
export const selectCurrentInstructorId = createSelector(
  selectInstructorState,
  (state: InstructorState) => state.selectedInstructorId
);
export const selectInstructorLoading = createSelector(
  selectInstructorState,
  (state: InstructorState) => state.loading
);
export const selectInstructorError = createSelector(
  selectInstructorState,
  (state: InstructorState) => state.error
);

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
export const selectCurrentInstructor = createSelector(
  selectInstructorEntities,
  selectCurrentInstructorId,
  (instructorEntities, instructorId) => instructorEntities[instructorId]
);
