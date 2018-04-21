import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment'; // Angular CLI environment
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LocalStorageModule } from '@ngx-pwa/local-storage';

import { AppStore } from './reducers';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

export const metaReducers: MetaReducer<AppStore>[] = !environment.production ? [storeFreeze]: [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LocalStorageModule,
    StoreModule.forRoot({ metaReducers }),
    EffectsModule.forRoot([]),
    NgbModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    AppRoutingModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
