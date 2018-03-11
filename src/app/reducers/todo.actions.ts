import { Action } from '@ngrx/store';
import { TodoModel } from '../shared/';

export const ADD_TODO = '[TODO] ADD_TODO';
export const ADD_TODO_SUCCESS = '[TODO] ADD_TODO_SUCCESS';
export const ADD_TODO_FAILED = '[TODO] ADD_TODO_FAILED';
export const DELETE_TODO = '[TODO] DELETE_TODO';
export const UPDATE_TODO = '[TODO] UPDATE_TODO';
export const TOGGLE_DONE = '[TODO] TOGGLE_DONE';
export const REMOVE_TODOS = '[TODO] REMOVE_TODOS';

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
    constructor () {}
}

export class DeleteTodoAction implements Action {
    readonly type = DELETE_TODO;
    constructor (public payload: {id: string}) {}
}

export class UpdateTodoAction implements Action {
    readonly type = UPDATE_TODO;
    constructor (public payload: TodoModel) {}
}

export class ToggleDoneAction implements Action {
    readonly type = TOGGLE_DONE;
    constructor (public payload: TodoModel) {}
}

export class RemoveTodosAction implements Action {
    readonly type = REMOVE_TODOS;
    constructor () {}
}

export type TodoActions = AddTodoAction | DeleteTodoAction | UpdateTodoAction |
  ToggleDoneAction | RemoveTodosAction |
  AddTodoSuccessAction | AddTodoFailedAction;
