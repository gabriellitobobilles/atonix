import { async, TestBed } from '@angular/core/testing';
import { ActionFormUpdateActivityStatusComponent } from './action-form-update-activity-status.component';
describe('ActionFormUpdateActivityStatusComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ActionFormUpdateActivityStatusComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ActionFormUpdateActivityStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=action-form-update-activity-status.component.spec.js.map