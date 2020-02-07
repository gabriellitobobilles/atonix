import { async, TestBed } from '@angular/core/testing';
import { TimeRangeSelectorModule } from './time-range-selector.module';

describe('TimeRangeSelectorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TimeRangeSelectorModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TimeRangeSelectorModule).toBeDefined();
  });
});
