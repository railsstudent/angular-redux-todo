import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { DisplayCourse } from '../models';
import { LearningsStore,
  selectCourseTotal,
  selectCurrentCourse,
  selectAllCoursesWithInstructors,
  selectCourseLoading } from '../reducers';
import * as courseActions from '../reducers/course.actions';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseComponent implements OnInit {
  courses$: Observable<DisplayCourse[]>;
  courseTotal$: Observable<number>;
  courseLoading$: Observable<boolean>;

  constructor(private store: Store<LearningsStore>) { }

  ngOnInit() {
    this.courses$ = this.store.pipe(select(selectAllCoursesWithInstructors));
    this.courseTotal$ = this.store.pipe(select(selectCourseTotal));
    this.courseLoading$ = this.store.pipe(select(selectCourseLoading));
  }

  deleteCourse(id: string) {
    this.store.dispatch(new courseActions.DeleteCourseAction({ id }));
  }

  selectCourse(id: string = null) {
    this.store.dispatch(new courseActions.SelectCourseAction({ id }));
  }
}
