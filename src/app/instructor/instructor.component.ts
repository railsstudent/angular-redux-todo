import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppStore, selectAllInstructors, selectCurrentInstructor, InstructorModel } from '../shared';
import * as instructorActions from '../reducers/instructor.actions';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {
  instructors$: Observable<InstructorModel[]>;
  currentInstructor$: Observable<InstructorModel>;
  newInstructor = {
    name: '',
    description: ''
  };

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.instructors$ = this.store.select(selectAllInstructors);
    this.currentInstructor$ = this.store.select(selectCurrentInstructor);
  }

  createInstructor() {
    this.store.dispatch(new instructorActions.AddInstructorAction({
      instructor: {
        id: UUID.UUID(),
        name: this.newInstructor.name,
        description: this.newInstructor.description
      }
    }));
  }

  deleteInstructor(id: string) {
    this.store.dispatch(new instructorActions.DeleteInstructorAction({ id }));
  }

  updateInstructor(id: string) {

  }
}
