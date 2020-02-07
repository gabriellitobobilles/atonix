import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFormUpdateIssueStatusComponent } from './action-form-update-issue-status.component';

describe('ActionFormUpdateIssueStatusComponent', () => {
  let component: ActionFormUpdateIssueStatusComponent;
  let fixture: ComponentFixture<ActionFormUpdateIssueStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionFormUpdateIssueStatusComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionFormUpdateIssueStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
