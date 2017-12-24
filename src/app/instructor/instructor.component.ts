import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppStore, selectAllInstructors, selectCurrentInstructor, selectInstructorTotal, InstructorModel } from '../shared';
import * as instructorActions from '../reducers/instructor.actions';
import { UUID } from 'angular2-uuid';
import * as objectAssign from 'es6-object-assign';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {
  instructors$: Observable<InstructorModel[]>;
  instructorTotal$: Observable<number>;
  currentInstructor$: Observable<InstructorModel>;
  currentInstructor: InstructorModel = {
    id: '',
    name: '',
    description: ''
  };

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.instructors$ = this.store.select(selectAllInstructors);
    this.instructorTotal$ = this.store.select(selectInstructorTotal);
    this.currentInstructor$ = this.store.select(selectCurrentInstructor);
    this.currentInstructor$.subscribe((instructor: InstructorModel) => {
      const { id = '', name = '', description = '' } = instructor || {};
      this.currentInstructor = objectAssign.assign({}, {
        id, name, description
      });
    });
  }

  deleteInstructor(id: string) {
    this.store.dispatch(new instructorActions.DeleteInstructorAction({ id }));
  }

  selectInstructor(id: string = null) {
    this.store.dispatch(new instructorActions.SelectInstructorAction({ id }));
  }

  updateInstructor() {
    const { id = null, name = '', description = '' } = this.currentInstructor || {};
    if (id) {
      this.store.dispatch(new instructorActions.UpdateInstructorAction({
        id, name, description
      }));
    } else {
      this.store.dispatch(new instructorActions.AddInstructorAction({
          id: UUID.UUID(), name, description
      }));
    }
  }
}
