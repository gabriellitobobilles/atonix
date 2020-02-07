import { async, TestBed } from '@angular/core/testing';
import { AssetTreeModule } from './asset-tree.module';
describe('AssetTreeModule', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [AssetTreeModule]
        }).compileComponents();
    }));
    it('should create', function () {
        expect(AssetTreeModule).toBeDefined();
    });
});
//# sourceMappingURL=asset-tree.module.spec.js.map