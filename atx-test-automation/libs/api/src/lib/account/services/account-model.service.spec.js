import { TestBed } from '@angular/core/testing';
import { AccountModelService } from './account-model.service';
describe('AccountModelService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(AccountModelService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=account-model.service.spec.js.map