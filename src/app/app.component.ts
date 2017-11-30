import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular + Redux Todo App';

  constructor(private titleService: Title) {
    titleService.setTitle(this.title);
  }

  ngOnInit() {
  }
}
