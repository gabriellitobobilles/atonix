import { TestBed, inject } from '@angular/core/testing';

import { HChartService } from './hchart.service';

describe('HChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HChartService]
    });
  });

  it('should be created', inject([HChartService], (service: HChartService) => {
    expect(service).toBeTruthy();
  }));
});
