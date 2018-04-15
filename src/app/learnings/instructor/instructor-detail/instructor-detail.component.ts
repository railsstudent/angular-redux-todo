import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Observable';
import * as objectAssign from 'es6-object-assign';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InstructorModel } from '../../models';
import { LearningsStore, selectCurrentInstructor, selectInstructorError } from '../../reducers';
import * as instructorActions from '../../reducers/instructor.actions';

const MAX_LEN = 500;

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstructorDetailComponent implements OnInit {
  currentInstructor$: Observable<InstructorModel>;
  currentInstructor: InstructorModel = {
    id: '',
    name: '',
    description: ''
  };
  maxDescriptionLen: number = MAX_LEN;
  instructorError$: Observable<string>;
  instructorErrMsg: string;

  constructor(private store: Store<LearningsStore>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentInstructor$ = this.store.pipe(select(selectCurrentInstructor));
    this.currentInstructor$.subscribe((instructor: InstructorModel) => {
      const { id = '', name = '', description = '' } = instructor || {};
      this.currentInstructor = objectAssign.assign({}, {
        id, name, description
      });
    });

    this.route.paramMap
    .subscribe((params: ParamMap) =>
      this.store.dispatch(new instructorActions.SelectInstructorAction({ id: params.get('id') })));

    this.instructorError$ = this.store.pipe(select(selectInstructorError));
    this.instructorError$.subscribe(err => {
      this.instructorErrMsg = err;
    });
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

  newInstructor() {
    this.store.dispatch(new instructorActions.SelectInstructorAction({ id: null }));
  }
}
