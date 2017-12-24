export { TodoModel, InstructorModel, CourseModel } from './model';
export { AppStore, reducers, selectInstructorIds,
  selectInstructorEntities, selectAllInstructors, selectInstructorTotal,
  selectCurrentInstructor,
  selectTodos, selectCompletedTodos, selectPendingTodos,
  selectCourseIds, selectCourseEntities, selectAllCourses,
  selectCourseTotal, selectCurrentCourse
} from './app-store';
