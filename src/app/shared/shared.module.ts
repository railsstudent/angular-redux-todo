import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoaderComponent } from "./loader-component/loader.component";

@NgModule({
  imports: [CommonModule],
  exports: [FormsModule, NgbModule, CommonModule, LoaderComponent],
  declarations: [LoaderComponent]
})
export class SharedModule {}
