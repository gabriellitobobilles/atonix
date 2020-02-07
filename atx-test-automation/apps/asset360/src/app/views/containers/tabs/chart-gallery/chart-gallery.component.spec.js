import { async, TestBed } from '@angular/core/testing';
import { ChartGalleryComponent } from './chart-gallery.component';
describe('ChartGalleryComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ChartGalleryComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ChartGalleryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=chart-gallery.component.spec.js.map