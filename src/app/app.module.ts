import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment'; // Angular CLI environment

import { AppStore, reducers } from './shared/index';
import { AppComponent } from './app.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';

export const metaReducers: MetaReducer<AppStore>[] = !environment.production ? [storeFreeze]: [];

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    TodoListComponent,
    TodoFormComponent,
    ConfirmModalComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    NgbModule.forRoot(),
    AppRoutingModule
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
