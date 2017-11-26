import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { todoReducer } from './reducers/todo.reducer';
import { AppComponent } from './app.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ todoReducer }),
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    Title
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
