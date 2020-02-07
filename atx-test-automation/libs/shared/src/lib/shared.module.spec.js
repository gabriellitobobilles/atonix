import { async, TestBed } from '@angular/core/testing';
import { SharedModule } from './shared.module';
describe('SharedModule', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [SharedModule]
        }).compileComponents();
    }));
    it('should create', function () {
        expect(SharedModule).toBeDefined();
    });
});
//# sourceMappingURL=shared.module.spec.js.map