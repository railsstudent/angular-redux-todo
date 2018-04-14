import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorComponent } from './instructor/instructor.component';
import { CourseComponent } from './course/course.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { InstructorDetailComponent } from './instructor/instructor-detail/instructor-detail.component';

const routes: Routes = [
  { path:'', pathMatch:'full', loadChildren: 'app/todo/todo.module#TodoModule' },
  { path:'instructor', component: InstructorComponent },
  { path:'instructor/:id', component: InstructorComponent },
  { path:'course', component: CourseComponent },
  { path:'courseOverview', component: CourseOverviewComponent },
  { path:'**', pathMatch:'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const RoutingComponents = [
  InstructorComponent,
  CourseComponent,
  CourseOverviewComponent,
  InstructorDetailComponent ];
