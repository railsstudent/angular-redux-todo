import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CardComponent } from "./card/card.component";
import { LoaderComponent } from "./loader/loader.component";
import { TotalCountComponent } from "./total-count/total-count.component";
@NgModule({
  imports: [CommonModule],
  exports: [
    FormsModule,
    NgbModule,
    CommonModule,
    LoaderComponent,
    TotalCountComponent,
    CardComponent
  ],
  declarations: [LoaderComponent, TotalCountComponent, CardComponent]
})
export class SharedModule {}
