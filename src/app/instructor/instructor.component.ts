import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { InstructorModel } from '../shared';
import { AppStore, selectAllInstructors, selectInstructorTotal, selectInstructorLoading } from '../reducers';
import * as instructorActions from '../reducers/instructor.actions';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {
  instructors$: Observable<InstructorModel[]>;
  instructorTotal$: Observable<number>;
  instructorLoading$: Observable<boolean>;

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.instructors$ = this.store.pipe(select(selectAllInstructors));
    this.instructorTotal$ = this.store.pipe(select(selectInstructorTotal));
    this.instructorLoading$ = this.store.pipe(select(selectInstructorLoading));
  }

  deleteInstructor(id: string) {
    this.store.dispatch(new instructorActions.DeleteInstructorAction({ id }));
  }

  selectInstructor(id: string = null) {
    this.store.dispatch(new instructorActions.SelectInstructorAction({ id }));
  }
}
