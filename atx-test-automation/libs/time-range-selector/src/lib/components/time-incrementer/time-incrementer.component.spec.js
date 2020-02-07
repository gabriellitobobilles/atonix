import { async, TestBed } from '@angular/core/testing';
import { TimeIncrementerComponent } from './time-incrementer.component';
describe('TimeIncrementerComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [TimeIncrementerComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(TimeIncrementerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=time-incrementer.component.spec.js.map