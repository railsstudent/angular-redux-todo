import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { todoReducer } from './reducers/todo.reducer';
import { AppComponent } from './app.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { InstructorComponent } from './instructor/instructor.component';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmModalComponent,
    EditModalComponent,
    TodoListComponent,
    TodoFormComponent,
    InstructorComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ todo: todoReducer }),
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    Title
  ],
  entryComponents: [
    ConfirmModalComponent,
    EditModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
