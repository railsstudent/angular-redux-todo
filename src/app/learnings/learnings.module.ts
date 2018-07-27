import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects, InstructorEffects } from './effects/';
import { SharedModule } from '../shared/shared.module';

import {
  LearningsStore,
  reducers
} from './reducers';
import { RoutingComponents } from './learnings-routing.module';
import { LearningsRoutingModule } from './learnings-routing.module';

@NgModule({
  declarations: [
    RoutingComponents
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('instructor', reducers.instructor),
    StoreModule.forFeature('course', reducers.course),
    EffectsModule.forFeature([CourseEffects, InstructorEffects]),
    LearningsRoutingModule
  ]
})
export class LearningsModule { }
