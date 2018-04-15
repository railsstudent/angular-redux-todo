import { ActionReducerMap } from '@ngrx/store';

import { TodoState } from '../todo/reducers';
import { InstructorState, CourseState } from '../learnings/reducers';

export interface AppStore {
  todo: TodoState,
  instructor: InstructorState,
  course: CourseState
}
