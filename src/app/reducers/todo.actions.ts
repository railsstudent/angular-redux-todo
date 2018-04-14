import { Action } from '@ngrx/store';
import { TodoModel } from '../shared/';

export const ADD_TODO = '[TODO] ADD_TODO';
export const ADD_TODO_SUCCESS = '[TODO] ADD_TODO_SUCCESS';
export const ADD_TODO_FAILED = '[TODO] ADD_TODO_FAILED';
export const DELETE_TODO = '[TODO] DELETE_TODO';
export const DELETE_TODO_SUCCESS = '[TODO] DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILED = '[TODO] DELETE_TODO_FAILED';
export const UPDATE_TODO = '[TODO] UPDATE_TODO';
export const UPDATE_TODO_SUCCESS = '[TODO] UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILED = '[TODO] UPDATE_TODO_FAILED';
export const TOGGLE_DONE = '[TODO] TOGGLE_DONE';
export const TOGGLE_DONE_SUCCESS = '[TODO] TOGGLE_DONE_SUCCESS';
export const TOGGLE_DONE_FAILED = '[TODO] TOGGLE_DONE_FAILED';
export const REMOVE_TODOS = '[TODO] REMOVE_TODOS';
export const REMOVE_TODOS_SUCCESS = '[TODO] REMOVE_TODOS_SUCCESS';
export const REMOVE_TODOS_FAILED = '[TODO] REMOVE_TODOS_FAILED';

export class AddTodoAction implements Action {
    readonly type = ADD_TODO;
    constructor (public payload: TodoModel) {}
}

export class AddTodoSuccessAction implements Action {
    readonly type = ADD_TODO_SUCCESS;
    constructor (public payload: TodoModel) {}
}

export class AddTodoFailedAction implements Action {
    readonly type = ADD_TODO_FAILED;
    constructor (public payload: {error: string}) {}
}

export class DeleteTodoAction implements Action {
    readonly type = DELETE_TODO;
    constructor (public payload: {id: string}) {}
}

export class DeleteTodoSuccessAction implements Action {
    readonly type = DELETE_TODO_SUCCESS;
    constructor (public payload: {id: string}) {}
}

export class DeleteTodoFailedAction implements Action {
    readonly type = DELETE_TODO_FAILED;
    constructor (public payload: {error: string}) {}
}

export class UpdateTodoAction implements Action {
    readonly type = UPDATE_TODO;
    constructor (public payload: TodoModel) {}
}

export class UpdateTodoSuccessAction implements Action {
    readonly type = UPDATE_TODO_SUCCESS;
    constructor (public payload: TodoModel) {}
}

export class UpdateTodoFailedAction implements Action {
    readonly type = UPDATE_TODO_FAILED;
    constructor (public payload: {error: string}) {}
}

export class ToggleDoneAction implements Action {
    readonly type = TOGGLE_DONE;
    constructor (public payload: TodoModel) {}
}

export class ToggleDoneSuccessAction implements Action {
    readonly type = TOGGLE_DONE_SUCCESS;
    constructor (public payload: TodoModel) {}
}

export class ToggleDoneFailedAction implements Action {
    readonly type = TOGGLE_DONE_FAILED;
    constructor (public payload: {error: string}) {}
}

export class RemoveTodosAction implements Action {
    readonly type = REMOVE_TODOS;
    constructor () {}
}

export class RemoveTodosSuccessAction implements Action {
    readonly type = REMOVE_TODOS_SUCCESS;
    constructor () {}
}

export class RemoveTodosFailedAction implements Action {
    readonly type = REMOVE_TODOS_FAILED;
    constructor (public payload: {error: string}) {}
}

export type TodoActions = AddTodoAction | DeleteTodoAction | UpdateTodoAction |
  ToggleDoneAction | RemoveTodosAction |
  AddTodoSuccessAction | AddTodoFailedAction |
  DeleteTodoSuccessAction | DeleteTodoFailedAction |
  UpdateTodoSuccessAction | UpdateTodoFailedAction |
  ToggleDoneSuccessAction | ToggleDoneFailedAction |
  RemoveTodosSuccessAction | RemoveTodosFailedAction;
