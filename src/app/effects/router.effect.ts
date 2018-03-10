import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import * as routerActions from '../reducers/router.actions';

@Injectable()
export class RouterEffects {

  constructor(private actions$: Actions, private router: Router) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$
    .ofType(routerActions.GO)
    .map((action: routerActions.Go) => action.payload)
    .do(({ path, query: queryParams, extras }) => {
      console.log ('Router Effect - routerActions.Go called ', path, queryParams, extras);
      this.router.navigate(path, { queryParams, ...extras});
    });
}
