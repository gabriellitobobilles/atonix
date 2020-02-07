import { async, TestBed } from '@angular/core/testing';
import { MaterialLayoutModule } from './material-layout.module';
import { AuthModule } from '@AtonixWebSites/auth';
import { MaterialModule } from '@AtonixWebSites/material';
describe('MaterialLayoutModule', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [MaterialLayoutModule, AuthModule, MaterialModule]
        }).compileComponents();
    }));
    it('should create', function () {
        expect(MaterialLayoutModule).toBeDefined();
    });
});
//# sourceMappingURL=material-layout.module.spec.js.map