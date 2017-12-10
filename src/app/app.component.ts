import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Todo App';
  isCollapsed: boolean = true;

  links = {
    instructor: ['/instructor'],
    course: ['/course']
  };

  constructor(private titleService: Title) {
    titleService.setTitle(this.title);
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
