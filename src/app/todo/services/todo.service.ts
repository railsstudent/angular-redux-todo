import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TodoModel } from "../models/";
import { TodoLocalstorageService } from "./todo-localstorage.service";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  constructor(private storage: TodoLocalstorageService) {}

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
