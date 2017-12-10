import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorComponent } from './instructor.component';

describe('InstructorComponent', () => {
  let component: InstructorComponent;
  let fixture: ComponentFixture<InstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
