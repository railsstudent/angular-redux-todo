import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoaderComponent } from "./loader-component/loader.component";
import { TotalCountComponent } from "./total-count/total-count.component";

@NgModule({
  imports: [CommonModule],
  exports: [
    FormsModule,
    NgbModule,
    CommonModule,
    LoaderComponent,
    TotalCountComponent
  ],
  declarations: [LoaderComponent, TotalCountComponent]
})
export class SharedModule {}
