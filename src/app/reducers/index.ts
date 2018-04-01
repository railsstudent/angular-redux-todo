import { createSelector, ActionReducerMap } from '@ngrx/store';
import { CourseModel, CourseOverviewModel, DisplayCourse } from '../shared/model';
import { selectInstructorEntities, instructorReducer, InstructorState } from './instructor.reducer';
import { selectAllCourses, courseReducer, CourseState } from './course.reducer';
import { todoReducer, TodoState } from './todo.reducer';

export {
  selectCompletedTodos, selectPendingTodos,
  selectAllTodos, selectTodosTotal, selectCompletedTodosCount, selectPendingTodosCount,
  todoReducer, TodoState, selectTodoLoading
} from './todo.reducer';

export {
  selectInstructorEntities, selectAllInstructors, selectInstructorTotal,
  selectCurrentInstructor,
  instructorReducer, InstructorState
} from './instructor.reducer';

export {
  selectCourseEntities, selectCourseTotal, selectCurrentCourse, selectAllCourses,
  courseReducer, CourseState,
  selectCourseTodo, selectCourseError
} from './course.reducer';

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

  export interface AppStore {
    todo: TodoState,
    instructor: InstructorState,
    course: CourseState
  };

  export const reducers: ActionReducerMap<AppStore> = {
    todo: todoReducer,
    instructor: instructorReducer,
    course: courseReducer
  };
