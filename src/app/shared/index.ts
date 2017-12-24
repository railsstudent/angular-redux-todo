export { TodoModel, InstructorModel, CourseModel } from './model';
export { AppStore, reducers,
  selectInstructorEntities, selectAllInstructors, selectInstructorTotal,
  selectCurrentInstructor,
  selectTodos, selectCompletedTodos, selectPendingTodos,
  selectCourseEntities,
  selectCourseTotal, selectCurrentCourse,
  selectAllCoursesWithInstructors
} from './app-store';
