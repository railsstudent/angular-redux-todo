import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { TodoModel, CourseModel, CourseOverviewModel, DisplayCourse } from './model';
import { selectAllCourses, selectInstructorEntities,
  TodoState, todoReducer,
  InstructorState, instructorReducer,
  CourseState, courseReducer
 } from '../reducers';
import { EntityState } from '@ngrx/entity';
import { Params, RouterStateSnapshot } from '@angular/router';
import { routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    // Only return an object including the URL and query params
    // instead of the entire snapshot
    return { url, queryParams };
  }
}

export interface AppStore {
  todo: TodoState,
  instructor: InstructorState,
  course: CourseState,
  router: RouterReducerState<RouterStateUrl>
};

export const reducers: ActionReducerMap<AppStore> = {
  todo: todoReducer,
  instructor: instructorReducer,
  course: courseReducer,
  router: routerReducer
};

// Selector

// return Courses with instructor names
export const selectAllCoursesWithInstructors = createSelector(selectAllCourses, selectInstructorEntities,
  (courses, instructorEntities) =>
      courses.map((course: CourseModel) => (
        <DisplayCourse>{
          rawCourse: course,
          instructorName: instructorEntities[course.instructorId].name || ''
        }
      ))
  );

export const selectCourseOverview = createSelector(selectInstructorEntities, selectAllCourses,
  (instructorEntities, courses) =>
    Object.keys(instructorEntities)
      .map((id: string) => (<CourseOverviewModel>{
          id: id,
          name: instructorEntities[id].name,
          description: instructorEntities[id].description,
          courses: courses.filter(course => course.instructorId === id)
      }))
  );
