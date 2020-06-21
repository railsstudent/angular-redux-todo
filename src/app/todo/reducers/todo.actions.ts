import { createAction, props } from "@ngrx/store";
import { TodoModel } from "../models/";

export const LoadTodosAction = createAction("[TODO] LOAD_TODOS");

export const LoadTodosSuccessAction = createAction("[TODO] LOAD_TODOS_SUCCESS", props<{ payload: TodoModel[] }>());

export const LoadTodosFailedAction = createAction("[TODO] LOAD_TODOS_FAILED", props<{ error: string }>());

export const AddTodoAction = createAction("[TODO] ADD_TODO", props<{ value: string; done: boolean }>());

export const AddTodoSuccessAction = createAction("[TODO] ADD_TODO_SUCCESS", props<{ payload: TodoModel }>());

export const AddTodoFailedAction = createAction("[TODO] ADD_TODO_FAILED", props<{ error: string }>());

export const DeleteTodoAction = createAction("[TODO] DELETE_TODO", props<{ id: string }>());

export const DeleteTodoSuccessAction = createAction("[TODO] DELETE_TODO_SUCCESS", props<{ id: string }>());

export const DeleteTodoFailedAction = createAction("[TODO] DELETE_TODO_FAILED", props<{ error: string }>());

export const UpdateTodoAction = createAction("[TODO] UPDATE_TODO", props<{ payload: TodoModel }>());

export const UpdateTodoSuccessAction = createAction("[TODO] UPDATE_TODO_SUCCESS", props<{ payload: TodoModel }>());

export const UpdateTodoFailedAction = createAction("[TODO] UPDATE_TODO_FAILED", props<{ error: string }>());

export const ToggleDoneAction = createAction("[TODO] TOGGLE_DONE", props<{ payload: TodoModel }>());

export const ToggleDoneSuccessAction = createAction("[TODO] TOGGLE_DONE_SUCCESS", props<{ payload: TodoModel }>());

export const ToggleDoneFailedAction = createAction("[TODO] TOGGLE_DONE_FAILED", props<{ error: string }>());

export const RemoveTodosAction = createAction("[TODO] REMOVE_TODOS");

export const RemoveTodosSuccessAction = createAction("[TODO] REMOVE_TODOS_SUCCESS");

export const RemoveTodosFailedAction = createAction("[TODO] REMOVE_TODOS_FAILED", props<{ error: string }>());
