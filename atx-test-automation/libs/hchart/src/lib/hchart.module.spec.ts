import { async, TestBed } from '@angular/core/testing';
import { HChartModule } from './hchart.module';

describe('HchartModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HChartModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(HChartModule).toBeDefined();
  });
});
