import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceAnalystIssuesComponent } from './performance-analyst-issues.component';

describe('PerformanceAnalystIssuesComponent', () => {
  let component: PerformanceAnalystIssuesComponent;
  let fixture: ComponentFixture<PerformanceAnalystIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceAnalystIssuesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceAnalystIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
