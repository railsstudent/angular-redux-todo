import { Action, createSelector } from '@ngrx/store';
import { TodoModel, AppStore } from '../shared/';
import * as todoActions from './todo.actions';

const INITIAL_STATE = [
  {
    id: '1',
    value: 'Learn to build angular app using ngrx/store',
    done: false
  },
  {
    id: '2',
    value: 'Build a template-driven form to submit todo value',
    done: false
  },
  {
    id: '3',
    value: 'Style the app with ngBootstrap 4',
    done: false
  }
];

export function todoReducer(state: TodoModel[] = INITIAL_STATE, action: todoActions.TodoActions) {
  switch (action.type) {
    case todoActions.ADD_TODO:
      return [...state, action.payload];
    case todoActions.DELETE_TODO:
      return state.filter(o => o.id !== action.payload.id);
    case todoActions.UPDATE_TODO:
      return state.map(o => {
        return (o.id === action.payload.id) ?
          Object.assign({}, o, { value: action.payload.newValue })
          : o;
      });
    case todoActions.TOGGLE_DONE:
      return state.map(o => {
        return (o.id === action.payload.id) ?
          Object.assign({}, o, { done: action.payload.done })
          : o;
      });
    case todoActions.REMOVE_TODOS:
      return [];
    default:
      return state;
  }
}
