import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { CourseOverviewModel } from "../models";
import { LearningsStore, selectCourseOverview } from "../reducers";

@Component({
  selector: "app-course-overview",
  templateUrl: "./course-overview.component.html",
  styleUrls: ["./course-overview.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseOverviewComponent implements OnInit {
  courseOverview$: Observable<CourseOverviewModel[]>;

  constructor(private store: Store<LearningsStore>) {}

  ngOnInit() {
    this.courseOverview$ = this.store.pipe(select(selectCourseOverview));
  }
}
