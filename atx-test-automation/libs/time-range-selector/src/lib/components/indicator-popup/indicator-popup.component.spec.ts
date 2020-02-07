import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorPopupComponent } from './indicator-popup.component';

describe('IndicatorPopupComponent', () => {
  let component: IndicatorPopupComponent;
  let fixture: ComponentFixture<IndicatorPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndicatorPopupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
