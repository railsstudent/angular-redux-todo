import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { TodoModel } from '../models/';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TodoLocalstorageService } from './todo-localstorage.service';
import { map, catchError } from 'rxjs/operators';
import { keys } from 'lodash-es';

@Injectable()
export class TodoService {

  constructor(private storage: TodoLocalstorageService) { }

  get(): Observable<any> {
    return this.storage.get()
      .pipe(
        map(entities => {
          const data = {
            ids: keys(entities),
            entities
          };
          console.log('todo.service get function', data);
          return data
        })
      );
  }

  add(newTodo: TodoModel): Observable<string | TodoModel> {
    return this.storage.add(newTodo);
  }

  remove(id: string): Observable<string> {
    return this.storage.remove(id);
  }

  removeAll() {
    return this.storage.removeAll();
  }

  update(todo: TodoModel): Observable<string | TodoModel> {
    return this.storage.update(todo);
  }
}
