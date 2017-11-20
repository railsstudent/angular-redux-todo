import { Action } from '@ngrx/store';
import { TodoModel } from '../shared/index';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_DONE = 'TOGGLE_DONE';
export const GET_TODOS = 'GET_TODOS';

export class AddTodoAction implements Action {
    readonly type = ADD_TODO;
    constructor (public payload: TodoModel) {}
}

export class DeleteTodoAction implements Action {
    readonly type = DELETE_TODO;
    constructor (public payload: {index: number}) {}
}

export class UpdateTodoAction implements Action {
    readonly type = UPDATE_TODO;
    constructor (public payload: {index: number, newValue: string}) {}
}

export class ToggleDoneAction implements Action {
    readonly type = TOGGLE_DONE;
    constructor (public payload: {index: number, done: boolean }) {}
}

export class GetTodosAction implements Action {
    readonly type = GET_TODOS;
    constructor (public payload: TodoModel[]) {}
}

export type TodoActions = AddTodoAction | DeleteTodoAction | UpdateTodoAction |
  ToggleDoneAction | GetTodosAction;
