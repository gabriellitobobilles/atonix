import { async, TestBed } from '@angular/core/testing';
import { AssetInfoTrayComponent } from './asset-info-tray.component';
describe('AssetInfoTrayComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AssetInfoTrayComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AssetInfoTrayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=asset-info-tray.component.spec.js.map