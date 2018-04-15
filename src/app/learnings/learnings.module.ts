import { NgModule } from '@angular/core';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CourseEffects, InstructorEffects } from './effects/';
import { SharedModule } from '../shared/shared.module';

import {
  LearningsStore,
  reducers
} from './reducers';
import { RoutingComponents } from './learnings-routing.module';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
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
