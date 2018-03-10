import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment'; // Angular CLI environment
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  CustomSerializer,
  RouterEffects
} from './shared';
import {
  AppStore,
  reducers
} from './reducers';
import { AppComponent } from './app.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';

export const metaReducers: MetaReducer<AppStore>[] = !environment.production ? [storeFreeze]: [];

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    TodoListComponent,
    TodoFormComponent,
    ConfirmModalComponent,
    EditModalComponent,
    CourseDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    AppRoutingModule,

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule,
    EffectsModule.forRoot([RouterEffects]),
    NgbModule.forRoot(),
    StoreDevtoolsModule.instrument({
     maxAge: 25 //  Retains last 25 states
   })
  ],
  providers: [
    Title,
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  entryComponents: [
    ConfirmModalComponent,
    EditModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
