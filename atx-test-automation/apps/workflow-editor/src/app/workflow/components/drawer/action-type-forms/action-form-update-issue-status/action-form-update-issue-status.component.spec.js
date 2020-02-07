import { async, TestBed } from '@angular/core/testing';
import { ActionFormUpdateIssueStatusComponent } from './action-form-update-issue-status.component';
describe('ActionFormUpdateIssueStatusComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ActionFormUpdateIssueStatusComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ActionFormUpdateIssueStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=action-form-update-issue-status.component.spec.js.map