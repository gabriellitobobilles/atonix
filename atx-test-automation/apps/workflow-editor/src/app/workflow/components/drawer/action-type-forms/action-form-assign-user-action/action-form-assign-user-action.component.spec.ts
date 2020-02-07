import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFormAssignUserActionComponent } from './action-form-assign-user-action.component';

describe('ActionFormAssignUserActionComponent', () => {
  let component: ActionFormAssignUserActionComponent;
  let fixture: ComponentFixture<ActionFormAssignUserActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionFormAssignUserActionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionFormAssignUserActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
