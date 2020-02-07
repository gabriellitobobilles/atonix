import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFormUpdateActivityStatusComponent } from './action-form-update-activity-status.component';

describe('ActionFormUpdateActivityStatusComponent', () => {
  let component: ActionFormUpdateActivityStatusComponent;
  let fixture: ComponentFixture<ActionFormUpdateActivityStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionFormUpdateActivityStatusComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionFormUpdateActivityStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
