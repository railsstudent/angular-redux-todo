export interface InstructorModel {
  id: string;
  name: string;
  description: string;
}

export interface CourseModel {
  id: string;
  instructorId: string;
  name: string;
  description: string;
}

export interface DisplayCourse {
  rawCourse: CourseModel;
  instructorName: string;
}

export interface CourseOverviewModel {
  id: string;
  name: string;
  description: string;
  courses: CourseModel[];
}
