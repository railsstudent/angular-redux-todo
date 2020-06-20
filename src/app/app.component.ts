import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "NgRx Todo App";
  isCollapsed = true;
  version = environment.version;

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
