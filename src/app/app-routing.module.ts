import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { InstructorComponent } from './instructor/instructor.component';
import { CourseComponent } from './course/course.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { InstructorDetailComponent } from './instructor/instructor-detail/instructor-detail.component';

const routes: Routes = [
  { path:'', pathMatch:'full', component: TodoComponent },
  { path:'instructor', component: InstructorComponent },
  { path:'course', component: CourseComponent },
  { path:'courseOverview', component: CourseOverviewComponent },
  { path:'**', component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const RoutingComponents = [
  TodoComponent,
  InstructorComponent,
  CourseComponent,
  CourseOverviewComponent,
  InstructorDetailComponent ];
