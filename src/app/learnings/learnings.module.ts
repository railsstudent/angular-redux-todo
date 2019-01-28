import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../shared/shared.module";
import { CourseEffects, InstructorEffects } from "./effects/";
import {
  LearningsRoutingModule,
  RoutingComponents
} from "./learnings-routing.module";
import { reducers } from "./reducers";

@NgModule({
  declarations: [RoutingComponents],
  imports: [
    SharedModule,
    StoreModule.forFeature("instructor", reducers.instructor),
    StoreModule.forFeature("course", reducers.course),
    EffectsModule.forFeature([CourseEffects, InstructorEffects]),
    LearningsRoutingModule
  ]
})
export class LearningsModule {}
