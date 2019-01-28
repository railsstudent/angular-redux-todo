import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "todo-list-item",
  templateUrl: "./todo-list-item.component.html",
  styleUrls: ["./todo-list-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListItemComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
