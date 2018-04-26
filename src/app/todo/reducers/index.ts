export {
  selectCompletedTodos, selectPendingTodos,
  selectAllTodos, selectTodosTotal, selectCompletedTodosCount, selectPendingTodosCount,
  todoReducer, TodoState, selectTodoLoading, selectTodoError
} from './todo.reducer';

import { TodoState } from './todo.reducer';

export interface todoStore {
  todo: TodoState
}
