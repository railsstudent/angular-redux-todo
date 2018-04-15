import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';
import { InstructorModel, CourseModel  } from '../../models';
import { LearningsStore,
  selectCurrentCourse,
  selectAllInstructors,
  selectCourseError } from '../../reducers';
import * as courseActions from '../../reducers/course.actions';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseDetailComponent implements OnInit {
  currentCourse$: Observable<CourseModel>;
  currentCourse: CourseModel = {
    id: '',
    name: '',
    description: '',
    instructorId: ''
  };
  instructors$: Observable<InstructorModel[]>;
  courseError$: Observable<string>;
  courseErrMsg: string;

  constructor(private store: Store<LearningsStore>) {
    this.courseErrMsg = '';
  }

  ngOnInit() {
    this.currentCourse$ = this.store.pipe(select(selectCurrentCourse));

    this.currentCourse$.subscribe((course: CourseModel) => {
      const { id = '', name = '', description = '', instructorId = '' } = course || {};
      this.currentCourse = {
        id,
        name,
        description,
        instructorId
      };
    });
    this.instructors$ = this.store.pipe(select(selectAllInstructors));
    this.courseError$ = this.store.pipe(select(selectCourseError));

    this.courseError$.subscribe(err => {
      this.courseErrMsg = err;
    });
  }

  updateCourse() {
    const { id = null, name = '', description = '', instructorId = '' } = this.currentCourse || {};
    if (id) {
      this.store.dispatch(new courseActions.UpdateCourseAction({
        id,
        name,
        description,
        instructorId
      }));
    } else {
      this.store.dispatch(new courseActions.AddCourseAction({
          id: UUID.UUID(),
          name,
          description,
          instructorId
      }));
    }
  }

  newCourse() {
    this.store.dispatch(new courseActions.SelectCourseAction({ id: null }));
  }
}