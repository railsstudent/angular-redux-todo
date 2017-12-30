import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppStore, selectCourseTotal, selectCurrentCourse,
  selectAllCoursesWithInstructors, DisplayCourse } from '../shared';
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

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.courses$ = this.store.select(selectAllCoursesWithInstructors);
    this.courseTotal$ = this.store.select(selectCourseTotal);
  }

  deleteCourse(id: string) {
    this.store.dispatch(new courseActions.DeleteCourseAction({ id }));
  }

  selectCourse(id: string = null) {
    this.store.dispatch(new courseActions.SelectCourseAction({ id }));
  }
}
