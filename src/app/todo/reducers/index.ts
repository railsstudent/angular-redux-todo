export {
  selectCompletedTodos, selectPendingTodos,
  selectAllTodos, selectTodosTotal, selectCompletedTodosCount, selectPendingTodosCount,
  todoReducer, TodoState, selectTodoLoading, selectTodoError
} from './todo.reducer';

import { ActionReducerMap } from '@ngrx/store';
import { TodoState, todoReducer } from './todo.reducer';

export interface TodoStore {
  todo: TodoState;
}

export const reducers: ActionReducerMap<TodoStore> = {
  todo: todoReducer,
};
