/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
/*SERVICES*/
import { InitialStateService } from './initial-state.service';
import { AuthConfigService } from './auth-config.service';

describe('InitialStateService', () => {
  const authConfigValue = {
    appContext: 123,
    permittedAppContexts: [1, 2, 3]
  };

  beforeEach(() => {
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

  it('should create', inject([InitialStateService], (initialStateService: InitialStateService) => {
    expect(initialStateService).toBeTruthy();
  }));

  it('should return value of config', inject([InitialStateService], (initialStateService: InitialStateService) => {
    expect(initialStateService.getAppContext()).toEqual(authConfigValue);
  }));
});
