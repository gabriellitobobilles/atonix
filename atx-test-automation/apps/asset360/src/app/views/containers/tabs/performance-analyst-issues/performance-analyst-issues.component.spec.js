import { async, TestBed } from '@angular/core/testing';
import { PerformanceAnalystIssuesComponent } from './performance-analyst-issues.component';
describe('PerformanceAnalystIssuesComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [PerformanceAnalystIssuesComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PerformanceAnalystIssuesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=performance-analyst-issues.component.spec.js.map