import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfirmModalComponent } from "./confirm-modal/confirm-modal.component";
import { EditModalComponent } from "./edit-modal/edit-modal.component";
import { TodoFormComponent } from "./todo-form/todo-form.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoComponent } from "./todo.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {}

export const RoutingComponents = [
  TodoComponent,
  TodoListComponent,
  TodoFormComponent
];

export const EntryComponents = [ConfirmModalComponent, EditModalComponent];
