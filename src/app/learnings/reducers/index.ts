import { ActionReducerMap, createSelector } from "@ngrx/store";
import { CourseModel, CourseOverviewModel, DisplayCourse } from "../models";
import { courseReducer, CourseState, selectAllCourses } from "./course.reducer";
import {
  instructorReducer,
  InstructorState,
  selectInstructorEntities
} from "./instructor.reducer";

export {
  courseReducer,
  CourseState,
  selectAllCourses,
  selectCourseEntities,
  selectCourseError,
  selectCourseLoading,
  selectCourseTotal,
  selectCurrentCourse
} from "./course.reducer";
export {
  instructorReducer,
  InstructorState,
  selectAllInstructors,
  selectCurrentInstructor,
  selectInstructorEntities,
  selectInstructorError,
  selectInstructorLoading,
  selectInstructorTotal
} from "./instructor.reducer";

export const selectAllCoursesWithInstructors = createSelector(
  selectAllCourses,
  selectInstructorEntities,
  (courses, instructorEntities) =>
    courses.map(
      (course: CourseModel) =>
        <DisplayCourse>{
          rawCourse: course,
          instructorName: instructorEntities[course.instructorId].name || ""
        }
    )
);

export const selectCourseOverview = createSelector(
  selectInstructorEntities,
  selectAllCourses,
  (instructorEntities, courses) =>
    Object.keys(instructorEntities).map(
      (id: string) =>
        <CourseOverviewModel>{
          id: id,
          name: instructorEntities[id].name,
          description: instructorEntities[id].description,
          courses: courses.filter(course => course.instructorId === id)
        }
    )
);

export interface LearningsStore {
  instructor: InstructorState;
  course: CourseState;
}

export const reducers: ActionReducerMap<LearningsStore> = {
  instructor: instructorReducer,
  course: courseReducer
};
