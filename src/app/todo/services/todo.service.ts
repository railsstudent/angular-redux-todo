import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { TodoModel } from '../models/';
import { Observable } from 'rxjs/Observable';
import { TodoLocalstorageService } from './todo-localstorage.service';

@Injectable()
export class TodoService {

  constructor(private storage: TodoLocalstorageService) { }

  get(): Observable<TodoModel[]> {
    return this.storage.get();
  }

  add(newTodo: TodoModel): Observable<TodoModel> {
    return this.storage.add(newTodo);
  }

  remove(id: string): Observable<string> {
    return this.storage.remove(id);
  }

  removeAll() {
    return this.storage.removeAll();
  }

  update(todo: TodoModel): Observable<TodoModel> {
    return this.storage.update(todo);
  }
}
