import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoModel } from "../models/";
import * as todoActions from "./todo.actions";

export interface TodoState extends EntityState<TodoModel> {
  loading: boolean;
  error: string;
}
export const todoAdapter: EntityAdapter<TodoModel> = createEntityAdapter<
  TodoModel
>();
// export const initialTodoState: TodoState = todoAdapter.getInitialState({
//   ids: ['1', '2', '3'],
//   entities: {
//     '1': {
//       id: '1',
//       value: 'Learn to build angular app using ngrx/store',
//       done: false
//     },
//     '2': {
//       id: '2',
//       value: 'Build a template-driven form to submit todo value',
//       done: false
//     },
//     '3': {
//       id: '3',
//       value: 'Style the app with ngBootstrap 4',
//       done: false
//     }
//   },
//   loading: false
// });

export const initialTodoState: TodoState = todoAdapter.getInitialState({
  loading: false,
  error: null
});

export function todoReducer(
  state: TodoState = initialTodoState,
  action: todoActions.TodoActions
): TodoState {
  switch (action.type) {
    case todoActions.ADD_TODO:
    case todoActions.DELETE_TODO:
    case todoActions.UPDATE_TODO:
    case todoActions.TOGGLE_DONE:
    case todoActions.REMOVE_TODOS:
    case todoActions.LOAD_TODOS:
      return { ...state, loading: true };
    case todoActions.ADD_TODO_SUCCESS:
      return {
        ...todoAdapter.addOne(action.payload, state),
        loading: false
      };
    case todoActions.ADD_TODO_FAILED:
    case todoActions.DELETE_TODO_FAILED:
    case todoActions.UPDATE_TODO_FAILED:
    case todoActions.TOGGLE_DONE_FAILED:
    case todoActions.REMOVE_TODOS_FAILED:
    case todoActions.LOAD_TODOS_FAILED:
      const { error = null } = action.payload || {};
      return { ...state, loading: false, error };
    case todoActions.LOAD_TODOS_SUCCESS:
      return {
        ...todoAdapter.addAll(action.payload, state),
        loading: false
      };
    case todoActions.DELETE_TODO_SUCCESS:
      return {
        ...todoAdapter.removeOne(action.payload.id, state),
        loading: false
      };
    case todoActions.UPDATE_TODO_SUCCESS:
    case todoActions.TOGGLE_DONE_SUCCESS:
      const { id = "", value = "", done = false } = action.payload || {};
      const changes = { value, done };
      return {
        ...todoAdapter.updateOne({ id, changes }, state),
        loading: false
      };
    case todoActions.REMOVE_TODOS_SUCCESS:
      return {
        ...todoAdapter.removeAll(state),
        loading: false
      };
    default:
      return {
        ...state,
        loading: false
      };
  }
}

// Todos Selectors
export const selectTodos = createFeatureSelector<TodoState>("todo");

export const {
  // select the array of todos
  selectAll: selectAllTodos,
  // select the total todos
  selectTotal: selectTodosTotal
} = todoAdapter.getSelectors(selectTodos);

export const selectCompletedTodos = createSelector(
  selectAllTodos,
  (todos: TodoModel[]) => todos.filter(todo => todo.done === true)
);
export const selectPendingTodos = createSelector(
  selectAllTodos,
  (todos: TodoModel[]) => todos.filter(todo => todo.done === false)
);
export const selectCompletedTodosCount = createSelector(
  selectCompletedTodos,
  (t: TodoModel[]) => t.length
);
export const selectPendingTodosCount = createSelector(
  selectPendingTodos,
  (t: TodoModel[]) => t.length
);
export const selectTodoLoading = createSelector(
  selectTodos,
  (state: TodoState) => state.loading
);
export const selectTodoError = createSelector(
  selectTodos,
  (state: TodoState) => state.error
);
