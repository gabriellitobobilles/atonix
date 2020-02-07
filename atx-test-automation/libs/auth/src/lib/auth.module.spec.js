import { async, TestBed } from '@angular/core/testing';
import { AuthModule } from './auth.module';
describe('AuthModule', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [AuthModule]
        }).compileComponents();
    }));
    it('should create', function () {
        expect(AuthModule).toBeDefined();
    });
});
//# sourceMappingURL=auth.module.spec.js.map