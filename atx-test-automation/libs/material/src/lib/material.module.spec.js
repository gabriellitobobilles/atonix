import { async, TestBed } from '@angular/core/testing';
import { MaterialModule } from './material.module';
describe('MaterialModule', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [MaterialModule]
        }).compileComponents();
    }));
    it('should create', function () {
        expect(MaterialModule).toBeDefined();
    });
});
//# sourceMappingURL=material.module.spec.js.map