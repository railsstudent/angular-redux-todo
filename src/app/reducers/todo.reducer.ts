import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TodoModel, AppStore } from '../shared/';
import * as todoActions from './todo.actions';

export interface TodoState extends EntityState<TodoModel> {}
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
  }
});

export function todoReducer(state: TodoState = initialTodoState, action: todoActions.TodoActions): TodoState {
  switch (action.type) {
    case todoActions.ADD_TODO:
      return todoAdapter.addOne(action.payload, state);
    case todoActions.DELETE_TODO:
      return todoAdapter.removeOne(action.payload.id, state);
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
