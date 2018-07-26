import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';

import { TodoState } from '../todo/reducers';
import { InstructorState, CourseState } from '../learnings/reducers';
import { todoReducer } from '../todo/reducers';
import { instructorReducer, courseReducer } from '../learnings/reducers';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

// Additionally, the router state snapshot is a mutable object, which can cause
// issues when developing with store freeze to prevent direct state mutations.
// This can be avoided by using a custom serializer.
export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}

export interface AppStore {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers = {
  router: routerReducer
};
