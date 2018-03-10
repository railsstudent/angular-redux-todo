import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';
import * as objectAssign from 'es6-object-assign';
import { AppStore, InstructorModel, CourseModel  } from '../../shared';
import { selectCurrentCourse, selectAllInstructors } from '../../reducers';
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

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.currentCourse$ = this.store.select(selectCurrentCourse);

    this.currentCourse$.subscribe((course: CourseModel) => {
      const { id = '', name = '', description = '', instructorId = '' } = course || {};
      this.currentCourse = objectAssign.assign({}, {
        id, name, description, instructorId
      });
    });
    this.instructors$ = this.store.select(selectAllInstructors);
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

  newCourse() {
    this.store.dispatch(new courseActions.SelectCourseAction({ id: null }));
  }
}
