/*ANGULAR*/
import { BehaviorSubject, Observable } from 'rxjs';
import { async, TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
/*MODEL*/
import { AuthUserState } from '..';
/*REDUCER*/
import { AuthState } from '../auth/auth.reducer';
import { UserState } from '../user/user.reducer';
/*FACADE*/
import { AuthFacade } from './auth.facade';
/*ACTIONS*/
import * as actions from './auth.actions';

export class TestStore<T> {
  private state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  setState(data: T) {
    this.state.next(data);
  }

  select(selector?: any): Observable<T> {
    return this.state.asObservable();
  }

  pipe(selector?: any): Observable<T> {
    return this.state.asObservable();
  }

  dispatch(action: any) {}
}

describe('Auth Facade', () => {
  let store: TestStore<AuthUserState>;

  const mockAuth: AuthState = {
    loggedIn: true,
    errorMessage: 'This is just a Test',
    message: 'test',
    isSoftwareToken: true,
    email: 'test@test.com',
    name: 'Atonix Test',
    authState: 'login',
    timeoutInSeconds: -1
  };

  const mockUser: UserState = {
    accountModelUser: {
      Email: 'test@test.com',
      FirstName: 'test',
      LastName: 'test',
      DisplayName: 'test',
      UserName: 'test',
      IsBV: true,
      NERCCIP: true,
      ServiceAccount: true
    },
    appContexts: null,
    selectedAppContext: 1,
    appContextsForApp: [1, 2, 3],
    errorMessage: 'test',
    lightTheme: true
  };

  const mockAuthUserState = { user: mockUser, auth: mockAuth };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthFacade,
        { provide: Store, useClass: TestStore } // use test store instead of ngrx store
      ]
    }).compileComponents();
  }));

  beforeEach(inject([Store], (testStore: TestStore<AuthUserState>) => {
    store = testStore; // save store reference for use in tests
    store.setState(mockAuthUserState); // set default state
  }));

  it('should create', inject([AuthFacade], (authFacade: AuthFacade) => {
    expect(authFacade).toBeTruthy();
  }));

  it('should log in', inject([AuthFacade], (authFacade: AuthFacade) => {
    const spy = spyOn(store, 'dispatch');
    authFacade.login('atonixTest', '12345678', true);
    expect(spy).toHaveBeenCalledWith(new actions.Login({ username: 'atonixTest', password: '12345678', rememberMe: true }));
  }));

  it('should send mfa', inject([AuthFacade], (authFacade: AuthFacade) => {
    const spy = spyOn(store, 'dispatch');
    authFacade.sendMfa('atonixTest123');
    expect(spy).toHaveBeenCalledWith(new actions.SendMfa('atonixTest123'));
  }));

  it('should initialize auth action', inject([AuthFacade], (authFacade: AuthFacade) => {
    const spy = spyOn(store, 'dispatch');
    authFacade.initialAuthAction(true);
    expect(spy).toHaveBeenCalledWith(new actions.InitialAuthAction(true));
  }));

  it('should login success redirect', inject([AuthFacade], (authFacade: AuthFacade) => {
    const spy = spyOn(store, 'dispatch');
    authFacade.loginSuccessRedirect();
    expect(spy).toHaveBeenCalledWith(new actions.LoginSuccessRedirect());
  }));

  it('should login redirect', inject([AuthFacade], (authFacade: AuthFacade) => {
    const spy = spyOn(store, 'dispatch');
    authFacade.loginRedirect();
    expect(spy).toHaveBeenCalledWith(new actions.LoginRedirect());
  }));

  it('should log out', inject([AuthFacade], (authFacade: AuthFacade) => {
    const spy = spyOn(store, 'dispatch');
    authFacade.logout();
    expect(spy).toHaveBeenCalledWith(new actions.Logout());
  }));

  it('should forgot password', inject([AuthFacade], (authFacade: AuthFacade) => {
    const spy = spyOn(store, 'dispatch');
    authFacade.forgotPassword('test@test.com');
    expect(spy).toHaveBeenCalledWith(new actions.ForgotPassword('test@test.com'));
  }));

  it('should request password', inject([AuthFacade], (authFacade: AuthFacade) => {
    const spy = spyOn(store, 'dispatch');
    authFacade.requestPassword('test@test.com');
    expect(spy).toHaveBeenCalledWith(new actions.RequestPassword('test@test.com'));
  }));

  it('should request password cancelled', inject([AuthFacade], (authFacade: AuthFacade) => {
    const spy = spyOn(store, 'dispatch');
    authFacade.requestPasswordCancelled();
    expect(spy).toHaveBeenCalledWith(new actions.RequestPasswordCancelled());
  }));

  it('should request password complete', inject([AuthFacade], (authFacade: AuthFacade) => {
    const spy = spyOn(store, 'dispatch');
    authFacade.requestPasswordComplete('test@test.com');
    expect(spy).toHaveBeenCalledWith(new actions.RequestPasswordComplete('test@test.com'));
  }));

  it('should change password', inject([AuthFacade], (authFacade: AuthFacade) => {
    const passwordChange = {
      email: 'test@test.com',
      password: '12345678',
      code: 'atonixTest123',
      rememberMe: true
    };
    const spy = spyOn(store, 'dispatch');
    authFacade.changePassword(passwordChange);
    expect(spy).toHaveBeenCalledWith(new actions.ChangePassword(passwordChange));
  }));

  it('should change password cancelled', inject([AuthFacade], (authFacade: AuthFacade) => {
    const spy = spyOn(store, 'dispatch');
    authFacade.changePasswordCancelled();
    expect(spy).toHaveBeenCalledWith(new actions.ChangePasswordCancelled());
  }));

  it('should initial password', inject([AuthFacade], (authFacade: AuthFacade) => {
    const initialPassword = {
      username: 'atonixTest',
      password: '12345678',
      name: 'Atonix Test',
      rememberMe: true
    };
    const spy = spyOn(store, 'dispatch');
    authFacade.initialPassword(initialPassword);
    expect(spy).toHaveBeenCalledWith(new actions.InitialPassword(initialPassword));
  }));

  it('should initial password cancelled', inject([AuthFacade], (authFacade: AuthFacade) => {
    const spy = spyOn(store, 'dispatch');
    authFacade.initialPasswordCancelled();
    expect(spy).toHaveBeenCalledWith(new actions.InitialPasswordCancelled());
  }));

  it('should get cognito settings', inject([AuthFacade], (authFacade: AuthFacade) => {
    const spy = spyOn(store, 'dispatch');
    authFacade.getCognitoSettings();
    expect(spy).toHaveBeenCalledWith(new actions.GetSettings());
  }));
});
