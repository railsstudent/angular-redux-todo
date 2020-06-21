import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector, createSelector, Action, createReducer, on } from "@ngrx/store";
import { TodoModel } from "../models/";
import * as todoActions from "./todo.actions";

export interface TodoState extends EntityState<TodoModel> {
  loading: boolean;
  error: string;
}
export const todoAdapter: EntityAdapter<TodoModel> = createEntityAdapter<
  TodoModel
>();

export const initialTodoState: TodoState = todoAdapter.getInitialState({
  loading: false,
  error: null
});

const reducer = createReducer(initialTodoState,
  on(todoActions.LoadTodosAction, state => ({ ...state, loading: true })),
  on(todoActions.DeleteTodoAction, state => ({ ...state, loading: true })),
  on(todoActions.UpdateTodoAction, state => ({ ...state, loading: true })),
  on(todoActions.ToggleDoneAction, state => ({ ...state, loading: true })),
  on(todoActions.RemoveTodosAction, state => ({ ...state, loading: true })),
  on(todoActions.AddTodoAction, state => ({ ...state, loading: true })),
  on(todoActions.AddTodoSuccessAction, (state, { payload }) =>
    ({ ...todoAdapter.addOne(payload, state), loading: false })),
  on(todoActions.AddTodoFailedAction, (state, { error = null }) => ({ ...state, loading: false, error })),
  on(todoActions.DeleteTodoFailedAction, (state, { error = null }) => ({ ...state, loading: false, error })),
  on(todoActions.UpdateTodoFailedAction, (state, { error = null }) => ({ ...state, loading: false, error })),
  on(todoActions.ToggleDoneFailedAction, (state, { error = null }) => ({ ...state, loading: false, error })),
  on(todoActions.RemoveTodosFailedAction, (state, { error = null }) => ({ ...state, loading: false, error })),
  on(todoActions.LoadTodosFailedAction, (state, { error = null }) => ({ ...state, loading: false, error })),
  on(todoActions.LoadTodosSuccessAction, (state, { payload }) => ({ ...todoAdapter.addAll(payload, state), loading: false })),
  on(todoActions.DeleteTodoSuccessAction, (state, { id }) => ({ ...todoAdapter.removeOne(id, state), loading: false })),
  on(todoActions.UpdateTodoSuccessAction, (state, { payload }) => {
    const { id = "", value = "", done = false } = payload || {};
    const changes = { value, done };
    return { ...todoAdapter.updateOne({ id, changes }, state), loading: false };
  }),
  on(todoActions.ToggleDoneSuccessAction, (state, { payload }) => {
    const { id = "", value = "", done = false } = payload || {};
    const changes = { value, done };
    return { ...todoAdapter.updateOne({ id, changes }, state), loading: false };
  }),
  on(todoActions.RemoveTodosSuccessAction, state => ({ ...todoAdapter.removeAll(state), loading: false }))
);

export function todoReducer(state: TodoState = initialTodoState, action: Action) {
  return reducer(state, action);
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
