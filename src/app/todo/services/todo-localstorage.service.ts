import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { TodoModel } from '../models/';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { filter, map, catchError, mergeMap, concatMap } from 'rxjs/operators';
import { assign, reduce } from 'lodash-es';

const TODO_LIST_KEY = 'todo_list';
const DEFAULT_ENTITIES =
  {
    '1': {
      id: '1',
      value: 'Learn to build angular app using ngrx 5.2',
      done: true
    },
    '2': {
      id: '2',
      value: 'Build a template-driven form to submit todo value',
      done: true
    },
    '3': {
      id: '3',
      value: 'Style the app with ngBootstrap 4',
      done: false
    },
    '4': {
      id: '4',
      value: 'Make modules lazy-loaded',
      done: false
    }
  };

@Injectable()
export class TodoLocalstorageService {

  constructor(private localStorage: LocalStorage) { }

  get(): Observable<any> {
    return this.localStorage.getItem<any>(TODO_LIST_KEY)
      .pipe(
        map(data => {
          console.log('localStorage', data);
          return (typeof data === 'undefined' || data === null) ? DEFAULT_ENTITIES : data;
        }),
        catchError(() => {
           return of(null);
         })
      );
  }

  add(newTodo: TodoModel) {
    const { id } = newTodo;
    return this.localStorage.getItem<any>(TODO_LIST_KEY)
      .pipe(
        map(data => assign({}, data, { id : newTodo })),
        concatMap(newData =>
          this.localStorage.setItem(TODO_LIST_KEY, newData).pipe(
            map(() => newTodo),
            catchError(() => of(`Error occurs when adding new todo ${id} to local storage`))
          )
        ),
        catchError(() => of('Error occurs when retrieving todos from local storage'))
      );
  }

  remove(id: string) {
    return this.localStorage.getItem<any>(TODO_LIST_KEY)
      .pipe(
          map(todos => reduce(todos, (acc, todo, todoId) => {
              if (id !== todoId) {
                acc[todoId] = todo;
              }
              return acc;
            })
          ),
          mergeMap(newTodos =>
            this.localStorage.setItem(TODO_LIST_KEY, newTodos).pipe(
              map(() => id),
              catchError(() => of(`Error occurs when remove todo ${id} from local storage`))
            )
          ),
          catchError(() => of('Error occurs when retrieving todos from local storage'))
      );
  }

  removeAll() {
    return this.localStorage.removeItem(TODO_LIST_KEY)
      .pipe(
          map(() => ({})),
          catchError(() => of('Error occurs when removing all todos from local storage.'))
      );
  }

  update(todo: TodoModel) {
    const { id } = todo;
    return this.localStorage.getItem<any>(TODO_LIST_KEY)
      .pipe(
          filter(data => data.id !== id),
          map(data => assign({}, data, { id: todo })),
          concatMap(newData =>
            this.localStorage.setItem(TODO_LIST_KEY, newData).pipe(
              map(() => todo),
              catchError( () => of(`Error occurs when updating todo ${id} to local storage.`))
            )
          ),
          catchError(() => of('Error occurs when retrieving todos from local storage.'))
      );
  }
}
