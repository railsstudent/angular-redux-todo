import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Todo App";
  isCollapsed = true;

  links = {
    instructor: ["/learnings/instructor"],
    course: ["/learnings/course"],
    courseOverview: ["/learnings/courseOverview"]
  };

  currentYear = new Date().getFullYear();

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }

  ngOnInit() {}
}
