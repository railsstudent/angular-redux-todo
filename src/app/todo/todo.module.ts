import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { todoReducer } from './reducers';
import { TodoEffects } from './effects/';
import { TodoRoutingModule, RoutingComponents, EntryComponents } from './todo-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TodoService, TodoLocalstorageService } from './services';

@NgModule({
  declarations: [
    RoutingComponents,
    EntryComponents
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('todo', todoReducer),
    EffectsModule.forFeature([TodoEffects]),
    TodoRoutingModule
  ],
  entryComponents: [
    EntryComponents
  ],
  providers: [TodoService, TodoLocalstorageService]
})
export class TodoModule { }
