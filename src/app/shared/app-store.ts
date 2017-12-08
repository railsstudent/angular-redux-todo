import { ActionReducerMap } from '@ngrx/store';
import { TodoModel } from './todo-model';
import * as fromTodo from '../reducers/todo.reducer';

export interface AppStore {
  todo: TodoModel[]
};

// Reducer Interface
export const reducers: ActionReducerMap<AppStore> = {
  todo: fromTodo.todoReducer
};
