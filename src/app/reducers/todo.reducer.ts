import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TodoModel } from '../shared/';
import * as todoActions from './todo.actions';

export interface TodoState extends EntityState<TodoModel> {
  loading: boolean
}
export const todoAdapter: EntityAdapter<TodoModel> = createEntityAdapter<TodoModel>();
export const initialTodoState: TodoState = todoAdapter.getInitialState({
  ids: ['1', '2', '3'],
  entities: {
    '1': {
      id: '1',
      value: 'Learn to build angular app using ngrx/store',
      done: false
    },
    '2': {
      id: '2',
      value: 'Build a template-driven form to submit todo value',
      done: false
    },
    '3': {
      id: '3',
      value: 'Style the app with ngBootstrap 4',
      done: false
    }
  },
  loading: false
});

export function todoReducer(state: TodoState = initialTodoState, action: todoActions.TodoActions): TodoState {
  switch (action.type) {
    case todoActions.ADD_TODO:
    case todoActions.DELETE_TODO:
      return { ...state, loading: true };
    case todoActions.ADD_TODO_SUCCESS:
      return {
        ...todoAdapter.addOne(action.payload, state),
        loading: false
      };
    case todoActions.ADD_TODO_FAILED:
    case todoActions.DELETE_TODO_FAILED:
      return { ...state, loading: false };
    case todoActions.DELETE_TODO_SUCCESS:
      return {
        ...todoAdapter.removeOne(action.payload.id, state),
        loading: false
      };
    case todoActions.UPDATE_TODO:
    case todoActions.TOGGLE_DONE:
      let { id = '', value = '', done = false } = action.payload || {};
      let changes = { value, done };
      return todoAdapter.updateOne({ id, changes }, state);
    case todoActions.REMOVE_TODOS:
      return todoAdapter.removeAll(state);
    default:
      return state;
  }
}

// Todos Selectors
export const selectTodos = createFeatureSelector<TodoState>('todo');

export const {
  // select the array of todos
  selectAll: selectAllTodos,
  // select the total todos courseEntities
  selectTotal: selectTodosTotal
} = todoAdapter.getSelectors(selectTodos);

export const selectCompletedTodos = createSelector(selectAllTodos,
  (todos: TodoModel[]) => todos.filter(todo => todo.done === true));
export const selectPendingTodos = createSelector(selectAllTodos,
  (todos: TodoModel[]) => todos.filter(todo => todo.done === false));
export const selectCompletedTodosCount = createSelector(selectCompletedTodos, (t: TodoModel[]) => t.length);
export const selectPendingTodosCount = createSelector(selectPendingTodos, (t: TodoModel[]) => t.length);
export const selectTodoLoading = createSelector(selectTodos, (state: TodoState) => state.loading);
