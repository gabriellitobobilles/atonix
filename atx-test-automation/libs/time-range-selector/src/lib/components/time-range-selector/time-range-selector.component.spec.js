import { async, TestBed } from '@angular/core/testing';
import { TimeRangeSelectorComponent } from './time-range-selector.component';
describe('TimeRangeSelectorComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [TimeRangeSelectorComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(TimeRangeSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=time-range-selector.component.spec.js.map