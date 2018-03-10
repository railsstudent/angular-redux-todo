import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppStore,  InstructorModel } from '../shared';
import { selectAllInstructors, selectInstructorTotal, } from '../reducers';
import * as instructorActions from '../reducers/instructor.actions';
import { DeleteCoursesByInstructorAction } from '../reducers/course.actions';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {
  instructors$: Observable<InstructorModel[]>;
  instructorTotal$: Observable<number>;

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.instructors$ = this.store.select(selectAllInstructors);
    this.instructorTotal$ = this.store.select(selectInstructorTotal);
  }

  deleteInstructor(id: string) {
    // delete all courses and instructor
    [
      new DeleteCoursesByInstructorAction({ instructorId: id }),
      new instructorActions.DeleteInstructorAction({ id })
    ].map(action => this.store.dispatch(action));
  }

  selectInstructor(id: string = null) {
    this.store.dispatch(new instructorActions.SelectInstructorAction({ id }));
  }
}
