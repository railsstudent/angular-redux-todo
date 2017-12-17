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
  currentInstructor: any = {
    id: '',
    name: '',
    description: ''
  };

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.instructors$ = this.store.select(selectAllInstructors);
    this.currentInstructor$ = this.store.select(selectCurrentInstructor);
    this.currentInstructor$.subscribe(instructor => {
      this.currentInstructor = instructor || { id: '', name: '', description: '' };
      console.log('instructor: ', instructor);
      console.log('subscribe - currentInstructor: ', this.currentInstructor);
    });
  }

  deleteInstructor(id: string) {
    this.store.dispatch(new instructorActions.DeleteInstructorAction({ id }));
  }

  selectInstructor(id: string = null) {
    this.store.dispatch(new instructorActions.SelectInstructorAction({ id }));
  }

  updateInstructor() {
    console.log('updateInstructor: ', this.currentInstructor);
    if (this.currentInstructor.id) {
      this.store.dispatch(new instructorActions.UpdateInstructorAction({
        id: this.currentInstructor.id,
        name: this.currentInstructor.name,
        description: this.currentInstructor.description
      }));
    } else {
      this.store.dispatch(new instructorActions.AddInstructorAction({
        instructor: {
          id: UUID.UUID(),
          name: this.currentInstructor.name,
          description: this.currentInstructor.description
        }
      }));
    }
  }
}
