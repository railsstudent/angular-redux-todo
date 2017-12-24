export interface TodoModel {
  id: string;
  done: boolean;
  value: string;
}

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
