import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { TodoModel, CourseModel, CourseOverviewModel, DisplayCourse } from './model';
import * as fromTodo from '../reducers/todo.reducer';
import * as fromInstructor from '../reducers/instructor.reducer';
import * as fromCourse from '../reducers/course.reducer';
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
  todo: fromTodo.TodoState,
  instructor: fromInstructor.InstructorState,
  course: fromCourse.CourseState,
  router: RouterReducerState<RouterStateUrl>
};

export const reducers: ActionReducerMap<AppStore> = {
  todo: fromTodo.todoReducer,
  instructor: fromInstructor.instructorReducer,
  course: fromCourse.courseReducer,
  router: routerReducer
};

// Selector
export const selectInstructorState = createFeatureSelector<fromInstructor.InstructorState>('instructor');
export const selectCurrentInstructorId = createSelector(selectInstructorState,
  (state: fromInstructor.InstructorState) => state.selectedInstructorId);

export const {
  // select the array of instructor ids
  selectIds: selectInstructorIds,

  // select the dictionary of instructor entities
  selectEntities: selectInstructorEntities,

  // select the array of instructors
  selectAll: selectAllInstructors,

  // select the total instructor count
  selectTotal: selectInstructorTotal
} = fromInstructor.instructorAdapter.getSelectors(selectInstructorState);

// return current Instructor
export const selectCurrentInstructor = createSelector(selectInstructorEntities, selectCurrentInstructorId,
  (instructorEntities, instructorId) => instructorEntities[instructorId]);

export const selectCourseState = createFeatureSelector<fromCourse.CourseState>('course');
export const selectCurrentCourseId = createSelector(selectCourseState,
  (state: fromCourse.CourseState) => state.selectedCourseId);

export const {
  // select the array of course ids
  selectIds: selectCourseIds,
  // select the dictionary of course entities
  selectEntities: selectCourseEntities,
  // select the array of courses
  selectAll: selectAllCourses,
  // select the total course count
  selectTotal: selectCourseTotal
} = fromCourse.courseAdapter.getSelectors(selectCourseState);

// return current Course
export const selectCurrentCourse = createSelector(selectCourseEntities, selectCurrentCourseId,
  (courseEntities, courseId) => courseEntities[courseId]);

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
