import { async, TestBed } from '@angular/core/testing';
import { IndicatorPopupComponent } from './indicator-popup.component';
describe('IndicatorPopupComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [IndicatorPopupComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(IndicatorPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=indicator-popup.component.spec.js.map