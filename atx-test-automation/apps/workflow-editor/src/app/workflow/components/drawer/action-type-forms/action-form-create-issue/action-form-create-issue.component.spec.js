import { async, TestBed } from '@angular/core/testing';
import { ActionFormCreateIssueComponent } from './action-form-create-issue.component';
describe('ActionFormCreateIssueComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ActionFormCreateIssueComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ActionFormCreateIssueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=action-form-create-issue.component.spec.js.map