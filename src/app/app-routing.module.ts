import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorComponent } from './instructor/instructor.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
