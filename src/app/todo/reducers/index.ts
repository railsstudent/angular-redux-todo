export {
  selectAllTodos,
  selectCompletedTodos,
  selectCompletedTodosCount,
  selectPendingTodos,
  selectPendingTodosCount,
  selectTodoError,
  selectTodoLoading,
  selectTodosTotal,
  todoReducer,
  TodoState
} from "./todo.reducer";

import { ActionReducerMap } from "@ngrx/store";
import { todoReducer, TodoState } from "./todo.reducer";

export interface TodoStore {
  todo: TodoState;
}

export const reducers: ActionReducerMap<TodoStore> = {
  todo: todoReducer
};
