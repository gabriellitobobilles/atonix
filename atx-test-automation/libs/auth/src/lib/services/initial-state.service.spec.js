/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
/*SERVICES*/
import { InitialStateService } from './initial-state.service';
import { AuthConfigService } from './auth-config.service';
describe('InitialStateService', function () {
    var authConfigValue = {
        appContext: 123,
        permittedAppContexts: [1, 2, 3]
    };
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [
                InitialStateService,
                {
                    provide: AuthConfigService,
                    useValue: authConfigValue
                }
            ]
        });
    });
    it('should create', inject([InitialStateService], function (initialStateService) {
        expect(initialStateService).toBeTruthy();
    }));
    it('should return value of config', inject([InitialStateService], function (initialStateService) {
        expect(initialStateService.getAppContext()).toEqual(authConfigValue);
    }));
});
//# sourceMappingURL=initial-state.service.spec.js.map