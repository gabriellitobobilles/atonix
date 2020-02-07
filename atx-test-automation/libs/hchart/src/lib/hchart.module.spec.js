import { async, TestBed } from '@angular/core/testing';
import { HChartModule } from './hchart.module';
describe('HchartModule', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [HChartModule]
        }).compileComponents();
    }));
    it('should create', function () {
        expect(HChartModule).toBeDefined();
    });
});
//# sourceMappingURL=hchart.module.spec.js.map