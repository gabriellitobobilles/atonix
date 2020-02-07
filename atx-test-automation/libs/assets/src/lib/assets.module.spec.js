import { async, TestBed } from '@angular/core/testing';
import { AssetsModule } from './assets.module';
describe('AssetsModule', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [AssetsModule]
        }).compileComponents();
    }));
    it('should create', function () {
        expect(AssetsModule).toBeDefined();
    });
});
//# sourceMappingURL=assets.module.spec.js.map