import { Injectable } from "@angular/core";
import { LocalStorage } from "@ngx-pwa/local-storage";
import { reject } from "lodash-es";
import { Observable, of } from "rxjs";
import { concatMap, map, mergeMap, switchMap } from "rxjs/operators";
import { TodoModel } from "../models/";

const TODO_LIST_KEY = "todo_list";
const DEFAULT_ENTITIES: TodoModel[] = [
  {
    id: "1",
    value: "Learn to build angular app using ngrx 5.2",
    done: true
  },
  {
    id: "2",
    value: "Build a template-driven form to submit todo value",
    done: true
  },
  {
    id: "3",
    value: "Style the app with ngBootstrap 4",
    done: false
  },
  {
    id: "4",
    value: "Make modules lazy-loaded",
    done: false
  }
];

@Injectable({
  providedIn: "root"
})
export class TodoLocalstorageService {
  constructor(private localStorage: LocalStorage) {}

  get(): Observable<TodoModel[]> {
    return this.localStorage.getItem<TodoModel[]>(TODO_LIST_KEY).pipe(
      switchMap(data => {
        console.log("localstorage service get()", data);
        if (data) {
          return of(data);
        }
        return this.localStorage
          .setItem(TODO_LIST_KEY, DEFAULT_ENTITIES)
          .pipe(map(() => DEFAULT_ENTITIES));
      })
    );
  }

  add(newTodo: TodoModel) {
    const { id } = newTodo;
    return this.localStorage.getItem<TodoModel[]>(TODO_LIST_KEY).pipe(
      map(data => (data || []).concat(newTodo)),
      concatMap(newData =>
        this.localStorage
          .setItem(TODO_LIST_KEY, newData)
          .pipe(map(() => newTodo))
      )
    );
  }

  remove(id: string) {
    return this.localStorage.getItem<TodoModel[]>(TODO_LIST_KEY).pipe(
      map(todos => reject(todos, { id })),
      mergeMap(newTodos =>
        this.localStorage.setItem(TODO_LIST_KEY, newTodos).pipe(map(() => id))
      )
    );
  }

  removeAll() {
    return this.localStorage.removeItem(TODO_LIST_KEY).pipe(map(() => null));
  }

  update(todo: TodoModel) {
    const { id } = todo;
    return this.localStorage.getItem<TodoModel[]>(TODO_LIST_KEY).pipe(
      map(todos => todos.map(t => (t.id === id ? todo : t))),
      concatMap(newTodos =>
        this.localStorage.setItem(TODO_LIST_KEY, newTodos).pipe(map(() => todo))
      )
    );
  }
}
