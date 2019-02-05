import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import * as objectAssign from "es6-object-assign";
import { Observable, Subscription } from "rxjs";
import { InstructorModel } from "../../models";
import {
  LearningsStore,
  selectCurrentInstructor,
  selectInstructorError
} from "../../reducers";
import * as instructorActions from "../../reducers/instructor.actions";

const MAX_LEN = 500;

@Component({
  selector: "app-instructor-detail",
  templateUrl: "./instructor-detail.component.html",
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstructorDetailComponent implements OnInit, OnDestroy {
  currentInstructor$: Observable<InstructorModel>;
  currentInstructor: InstructorModel = {
    id: "",
    name: "",
    description: ""
  };
  maxDescriptionLen: number = MAX_LEN;
  instructorError$: Observable<string>;
  currentInstructorSubscription: Subscription;

  constructor(
    private store: Store<LearningsStore>,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentInstructor$ = this.store.pipe(select(selectCurrentInstructor));
    this.currentInstructorSubscription = this.currentInstructor$.subscribe(
      (instructor: InstructorModel) => {
        const { id = "", name = "", description = "" } = instructor || {};
        this.currentInstructor = objectAssign.assign(
          {},
          {
            id,
            name,
            description
          }
        );
        this.cd.markForCheck();
      }
    );

    this.route.paramMap.subscribe((params: ParamMap) =>
      this.store.dispatch(
        new instructorActions.SelectInstructorAction({ id: params.get("id") })
      )
    );

    this.instructorError$ = this.store.pipe(select(selectInstructorError));
  }

  ngOnDestroy() {
    if (this.currentInstructorSubscription) {
      this.currentInstructorSubscription.unsubscribe();
    }
  }

  updateInstructor() {
    const { id = null, name = "", description = "" } =
      this.currentInstructor || {};
    if (id) {
      this.store.dispatch(
        new instructorActions.UpdateInstructorAction({
          id,
          name,
          description
        })
      );
    } else {
      this.store.dispatch(
        new instructorActions.AddInstructorAction({
          id: UUID.UUID(),
          name,
          description
        })
      );
    }
  }

  newInstructor() {
    this.store.dispatch(
      new instructorActions.SelectInstructorAction({ id: null })
    );
  }
}
