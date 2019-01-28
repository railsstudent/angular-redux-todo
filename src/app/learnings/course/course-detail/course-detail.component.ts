import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { Observable, Subscription } from "rxjs";
import { CourseModel, InstructorModel } from "../../models";
import {
  LearningsStore,
  selectAllInstructors,
  selectCourseError,
  selectCurrentCourse
} from "../../reducers";
import * as courseActions from "../../reducers/course.actions";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.component.html",
  styleUrls: ["./course-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  currentCourse$: Observable<CourseModel>;
  currentCourse: CourseModel = {
    id: "",
    name: "",
    description: "",
    instructorId: ""
  };
  instructors$: Observable<InstructorModel[]>;
  courseError$: Observable<string>;
  currentCourseSubscription: Subscription;

  constructor(
    private store: Store<LearningsStore>,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentCourse$ = this.store.pipe(select(selectCurrentCourse));

    this.currentCourseSubscription = this.currentCourse$.subscribe(
      (course: CourseModel) => {
        const { id = "", name = "", description = "", instructorId = "" } =
          course || {};
        this.currentCourse = {
          id,
          name,
          description,
          instructorId
        };
        this.cd.markForCheck();
      }
    );
    this.instructors$ = this.store.pipe(select(selectAllInstructors));
    this.courseError$ = this.store.pipe(select(selectCourseError));
  }

  updateCourse() {
    const { id = null, name = "", description = "", instructorId = "" } =
      this.currentCourse || {};
    if (id) {
      this.store.dispatch(
        new courseActions.UpdateCourseAction({
          id,
          name,
          description,
          instructorId
        })
      );
    } else {
      this.store.dispatch(
        new courseActions.AddCourseAction({
          id: UUID.UUID(),
          name,
          description,
          instructorId
        })
      );
    }
  }

  newCourse() {
    this.store.dispatch(new courseActions.SelectCourseAction({ id: null }));
  }

  ngOnDestroy() {
    if (this.currentCourseSubscription) {
      this.currentCourseSubscription.unsubscribe();
    }
  }
}
