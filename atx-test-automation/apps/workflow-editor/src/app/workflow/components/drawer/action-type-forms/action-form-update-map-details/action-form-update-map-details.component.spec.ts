import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFormUpdateMapDetailsComponent } from './action-form-update-map-details.component';

describe('ActionFormUpdateMapDetailsComponent', () => {
  let component: ActionFormUpdateMapDetailsComponent;
  let fixture: ComponentFixture<ActionFormUpdateMapDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionFormUpdateMapDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionFormUpdateMapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
