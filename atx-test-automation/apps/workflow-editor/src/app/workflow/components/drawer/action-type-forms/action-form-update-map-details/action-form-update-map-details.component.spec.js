import { async, TestBed } from '@angular/core/testing';
import { ActionFormUpdateMapDetailsComponent } from './action-form-update-map-details.component';
describe('ActionFormUpdateMapDetailsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ActionFormUpdateMapDetailsComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ActionFormUpdateMapDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=action-form-update-map-details.component.spec.js.map