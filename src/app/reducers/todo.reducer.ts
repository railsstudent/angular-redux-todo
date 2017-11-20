import { ActionReducer, Action } from '@ngrx/store';
import { TodoModel } from '../shared/index';
import * as todoActions from './todo.actions';

const INITIAL_STATE = [];

export interface todoPayload {
  index?: number;
  done?: boolean;
  value?: string;
  newValue?: string;
}

const todo: ActionReducer<TodoModel[]> = (state: TodoModel[] = INITIAL_STATE, action: todoActions.TodoActions) => {
  Object.freeze(state);
  Object.freeze(action);
  switch (action.type) {
    case todoActions.GET_TODOS:
      return action.payload;
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
    default:
      return state;
  }
}

export function todoReducer(state: TodoModel[], action: todoActions.TodoActions) {
  return todo(state, action);
}
