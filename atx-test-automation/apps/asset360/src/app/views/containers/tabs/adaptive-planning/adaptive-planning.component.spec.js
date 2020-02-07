import { async, TestBed } from '@angular/core/testing';
import { AdaptivePlanningComponent } from './adaptive-planning.component';
describe('AdaptivePlanningComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AdaptivePlanningComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AdaptivePlanningComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=adaptive-planning.component.spec.js.map