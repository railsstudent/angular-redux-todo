import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CourseOverviewModel } from '../shared';
import { AppStore, selectCourseOverview } from '../reducers';

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
    this.courseOverview$ = this.store.pipe(select(selectCourseOverview));
  }

}
