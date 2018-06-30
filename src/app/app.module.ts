import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule, MetaReducer } from "@ngrx/store";
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from "@ngrx/router-store";
import { storeFreeze } from "ngrx-store-freeze";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "../environments/environment"; // Angular CLI environment
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppStore, reducers, CustomRouterStateSerializer } from "./reducers";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

export const metaReducers: MetaReducer<AppStore>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
      /*
        They stateKey defines the name of the state used by the router-store reducer.
        This matches the key defined in the map of reducers
      */
      stateKey: "router"
    }),
    EffectsModule.forRoot([]),
    NgbModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: "NgRx Todo App Store DevTools",
      maxAge: 25 //  Retains last 25 states
    }),
    AppRoutingModule
  ],
  providers: [
    Title,
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
