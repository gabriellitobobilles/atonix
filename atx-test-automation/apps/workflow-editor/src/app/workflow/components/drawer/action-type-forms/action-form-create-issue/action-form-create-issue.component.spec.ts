import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFormCreateIssueComponent } from './action-form-create-issue.component';

describe('ActionFormCreateIssueComponent', () => {
  let component: ActionFormCreateIssueComponent;
  let fixture: ComponentFixture<ActionFormCreateIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionFormCreateIssueComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionFormCreateIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
