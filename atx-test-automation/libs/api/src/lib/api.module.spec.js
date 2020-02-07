import { async, TestBed } from '@angular/core/testing';
import { ApiModule } from './api.module';
describe('ApiModule', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [ApiModule]
        }).compileComponents();
    }));
    it('should create', function () {
        expect(ApiModule).toBeDefined();
    });
});
//# sourceMappingURL=api.module.spec.js.map