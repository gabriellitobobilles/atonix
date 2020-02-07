/*ANGULAR*/
import { async, TestBed } from '@angular/core/testing';
/*MODULE*/
import { LayoutModule } from './layout.module';
describe('LayoutModule', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [LayoutModule]
        }).compileComponents();
    }));
    it('should create', function () {
        expect(LayoutModule).toBeDefined();
    });
});
//# sourceMappingURL=layout.module.spec.js.map