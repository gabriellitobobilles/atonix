import { async, TestBed } from '@angular/core/testing';
import { TimeRangeSelectorModule } from './time-range-selector.module';
describe('TimeRangeSelectorModule', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [TimeRangeSelectorModule]
        }).compileComponents();
    }));
    it('should create', function () {
        expect(TimeRangeSelectorModule).toBeDefined();
    });
});
//# sourceMappingURL=time-range-selector.module.spec.js.map