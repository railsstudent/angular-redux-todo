import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppStore, selectCourseTotal, selectCurrentCourse,
  selectAllInstructors, selectAllCoursesWithInstructors, CourseModel, InstructorModel, DisplayCourse } from '../shared';
import * as courseActions from '../reducers/course.actions';
import { UUID } from 'angular2-uuid';
import * as objectAssign from 'es6-object-assign';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseComponent implements OnInit {
  courses$: Observable<DisplayCourse[]>;
  courseTotal$: Observable<number>;
  currentCourse$: Observable<CourseModel>;
  currentCourse: CourseModel = {
    id: '',
    name: '',
    description: '',
    instructorId: ''
  };
  instructors$: Observable<InstructorModel[]>;

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.courses$ = this.store.select(selectAllCoursesWithInstructors);
    this.courseTotal$ = this.store.select(selectCourseTotal);
    this.currentCourse$ = this.store.select(selectCurrentCourse);

    this.currentCourse$.subscribe((course: CourseModel) => {
      const { id = '', name = '', description = '', instructorId = '' } = course || {};
      this.currentCourse = objectAssign.assign({}, {
        id, name, description, instructorId
      });
    });
    this.instructors$ = this.store.select(selectAllInstructors);
  }

  deleteCourse(id: string) {
    this.store.dispatch(new courseActions.DeleteCourseAction({ id }));
  }

  selectCourse(id: string = null) {
    this.store.dispatch(new courseActions.SelectCourseAction({ id }));
  }

  updateCourse() {
    const { id = null, name = '', description = '', instructorId = '' } = this.currentCourse || {};
    if (id) {
      this.store.dispatch(new courseActions.UpdateCourseAction({
        id, name, description, instructorId
      }));
    } else {
      this.store.dispatch(new courseActions.AddCourseAction({
          id: UUID.UUID(), name, description, instructorId
      }));
    }
  }
}
