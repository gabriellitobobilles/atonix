import { async, TestBed } from '@angular/core/testing';
import { ActionFormAssignUserActionComponent } from './action-form-assign-user-action.component';
describe('ActionFormAssignUserActionComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ActionFormAssignUserActionComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ActionFormAssignUserActionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=action-form-assign-user-action.component.spec.js.map