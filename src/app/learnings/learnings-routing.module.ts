import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorComponent } from './instructor/instructor.component';
import { InstructorDetailComponent } from './instructor/instructor-detail/instructor-detail.component';
import { CourseComponent } from './course/course.component';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';

@NgModule({
  imports: [RouterModule.forChild(
    [
      { path: 'instructor', component: InstructorComponent },
      { path: 'instructor/:id', component: InstructorComponent },
      { path: 'course', component: CourseComponent },
      { path: 'courseOverview', component: CourseOverviewComponent }
    ])],
  exports: [RouterModule]
})
export class LearningsRoutingModule {}

export const RoutingComponents = [
  InstructorComponent,
  CourseComponent,
  CourseDetailComponent,
  CourseOverviewComponent,
  InstructorDetailComponent ];
