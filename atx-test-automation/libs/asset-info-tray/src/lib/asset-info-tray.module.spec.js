import { async, TestBed } from '@angular/core/testing';
import { AssetInfoTrayModule } from './asset-info-tray.module';
describe('AssetInfoTrayModule', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [AssetInfoTrayModule]
        }).compileComponents();
    }));
    it('should create', function () {
        expect(AssetInfoTrayModule).toBeDefined();
    });
});
//# sourceMappingURL=asset-info-tray.module.spec.js.map