import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppStore, selectCourseOverview, CourseOverviewModel } from '../shared';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseOverviewComponent implements OnInit {
  courseOverview$: Observable<CourseOverviewModel[]>;

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.courseOverview$ = this.store.select(selectCourseOverview);
  }

}
