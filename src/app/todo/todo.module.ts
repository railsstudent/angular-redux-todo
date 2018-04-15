import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TodoComponent } from './todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { todoReducer } from './reducers';
import { TodoEffects } from './effects/';
import { TodoRoutingModule } from './todo-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoFormComponent,
    ConfirmModalComponent,
    EditModalComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('todo', todoReducer),
    EffectsModule.forFeature([TodoEffects]),
    TodoRoutingModule
  ],
  entryComponents: [
    ConfirmModalComponent,
    EditModalComponent
  ]
})
export class TodoModule { }
