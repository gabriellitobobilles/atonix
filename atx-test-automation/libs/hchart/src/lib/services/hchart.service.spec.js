import { TestBed, inject } from '@angular/core/testing';
import { HChartService } from './hchart.service';
describe('HChartService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [HChartService]
        });
    });
    it('should be created', inject([HChartService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=hchart.service.spec.js.map