import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../shared/shared.module";
import { TodoEffects } from "./effects/";
import { todoReducer } from "./reducers";
import { TodoListTableComponent } from "./todo-list-table/todo-list-table.component";
import {
  EntryComponents,
  RoutingComponents,
  TodoRoutingModule
} from "./todo-routing.module";
import { TodoSummaryComponent } from "./todo-summary/todo-summary.component";

@NgModule({
  declarations: [
    RoutingComponents,
    EntryComponents,
    TodoListTableComponent,
    TodoSummaryComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature("todo", todoReducer),
    EffectsModule.forFeature([TodoEffects]),
    TodoRoutingModule
  ],
  entryComponents: [EntryComponents],
})
export class TodoModule {}
