import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeIncrementerComponent } from './time-incrementer.component';

describe('TimeIncrementerComponent', () => {
  let component: TimeIncrementerComponent;
  let fixture: ComponentFixture<TimeIncrementerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeIncrementerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeIncrementerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
