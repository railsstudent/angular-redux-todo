export {
  selectCompletedTodos, selectPendingTodos,
  selectAllTodos, selectTodosTotal, selectCompletedTodosCount, selectPendingTodosCount,
  todoReducer, TodoState, selectTodoLoading
} from './todo.reducer';

import { TodoState } from './todo.reducer';

export interface todoStore {
  todo: TodoState
}
