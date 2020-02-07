import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptivePlanningComponent } from './adaptive-planning.component';

describe('AdaptivePlanningComponent', () => {
  let component: AdaptivePlanningComponent;
  let fixture: ComponentFixture<AdaptivePlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdaptivePlanningComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptivePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
