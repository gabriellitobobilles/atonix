/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoreModule, Store } from '@ngrx/store';
/*SERVICES*/
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
/*FACADE*/
import { AuthFacade } from '../state/auth/auth.facade';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot([])],
      providers: [AuthGuardService, AuthService, AuthFacade, Store]
    });
  });

  it('should create', inject([AuthGuardService], (authGuardService: AuthGuardService) => {
    expect(authGuardService).toBeTruthy();
  }));

  it('should return true for a logged in user', inject(
    [AuthGuardService, AuthService, HttpTestingController],
    (authGuardService: AuthGuardService, authService: AuthService, backend: HttpTestingController) => {
      let result;
      authService.Login('test@test.com', '12345678', true).subscribe();

      authGuardService.canActivate().subscribe((data: any) => {
        result = data;
      });
      expect(result).toEqual(true);
    }
  ));
});
