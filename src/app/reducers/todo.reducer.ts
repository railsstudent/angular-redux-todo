import { Action, createSelector } from '@ngrx/store';
import { TodoModel, AppStore } from '../shared/';
import * as todoActions from './todo.actions';

const INITIAL_STATE = [
  {
    value: 'Learn to build angular app using ngrx/store',
    done: false
  },
  {
    value: 'Build a template-driven form to submit todo value',
    done: false
  },
  {
    value: 'Style the app with ngBootstrap 4',
    done: false
  }
];

export interface todoPayload {
  index?: number;
  done?: boolean;
  value?: string;
  newValue?: string;
}

// Selector
export const selectTodos = (state: AppStore) => state.todo;
export const selectCompletedTodos = createSelector(selectTodos,
  (todos: TodoModel[]) => todos.filter(todo => todo.done === true));
export const selectPendingTodos = createSelector(selectTodos,
  (todos: TodoModel[]) => todos.filter(todo => todo.done === false));

export function todoReducer(state: TodoModel[] =INITIAL_STATE, action: todoActions.TodoActions) {
  switch (action.type) {
    case todoActions.ADD_TODO:
      return [...state, action.payload];
    case todoActions.DELETE_TODO:
      return state.filter((o, index) => index !== action.payload.index);
    case todoActions.UPDATE_TODO:
      return state.map((o, index) => {
        return (index === action.payload.index) ?
          Object.assign({}, o, { value: action.payload.newValue })
          : o;
      });
    case todoActions.TOGGLE_DONE:
      return state.map((o, index) => {
        return (index === action.payload.index) ?
          Object.assign({}, o, { done: action.payload.done })
          : o;
      });
    case todoActions.REMOVE_TODOS:
      return [];
    default:
      return state;
  }
}
