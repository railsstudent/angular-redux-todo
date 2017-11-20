import { TodoModel } from './todo-model';
export interface AppStore {
  todoReducer: TodoModel[]
}
