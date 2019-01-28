import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../shared/shared.module";
import { TodoEffects } from "./effects/";
import { todoReducer } from "./reducers";
import { TodoLocalstorageService, TodoService } from "./services";
import { TodoListItemComponent } from "./todo-list-item/todo-list-item.component";
import {
  EntryComponents,
  RoutingComponents,
  TodoRoutingModule
} from "./todo-routing.module";

@NgModule({
  declarations: [RoutingComponents, EntryComponents, TodoListItemComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature("todo", todoReducer),
    EffectsModule.forFeature([TodoEffects]),
    TodoRoutingModule
  ],
  entryComponents: [EntryComponents],
  providers: [TodoService, TodoLocalstorageService]
})
export class TodoModule {}
