/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
/*SERVICE*/
import { AuthService } from './auth.service';
/*FACADE*/
import { AuthFacade } from '../state/auth/auth.facade';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot([])],
      providers: [AuthService, AuthFacade, Store]
    });
  });

  it('should create', inject([AuthService], (authService: AuthService) => {
    expect(authService).toBeTruthy();
  }));

  it('should set value to user pool id and return it', inject([AuthService], (authService: AuthService) => {
    expect(authService.UserPoolID('us-east-1_test12345')).toEqual('us-east-1_test12345');
  }));

  it('should set value to client id and return it', inject([AuthService], (authService: AuthService) => {
    expect(authService.ClientID('test1234567891234567891234')).toEqual('test1234567891234567891234');
  }));
});
