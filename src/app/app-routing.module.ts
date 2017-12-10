import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { InstructorComponent } from './instructor/instructor.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  { path:'', pathMatch:'full', component: TodoComponent },
  { path:'instructor', component: InstructorComponent },
  { path:'course', component: CourseComponent },
  { path:'**', component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const RoutingComponents = [ TodoComponent, InstructorComponent,
  CourseComponent ];
