/*ANGULAR*/
import { Actions } from '@ngrx/effects';
import { Observable, BehaviorSubject } from 'rxjs';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
/*SERVICE*/
import { AuthService } from '../../services/auth.service';
/*EFFECT*/
import { AuthEffects } from './auth.effects';
/*ACTIONS*/
import * as authActions from './auth.actions';
/*FACADE*/
import { RouterFacade } from '@AtonixWebSites/ngrx-router';
/*MODEL*/
import { AuthUserState } from '..';
/*REDUCER*/
import { AuthState } from './auth.reducer';
import { UserState } from '../user/user.reducer';

export class TestActions extends Actions {
  constructor() {
    super();
  }

  set stream(source: Observable<any>) {
    /* See https://github.com/tomastrajan/angular-ngrx-material-starter/issues/299 */
    /*tslint:disable-next-line */
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

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

describe('Auth Effects', () => {
  let actions: TestActions;
  let effects: AuthEffects;
  let authService: AuthService;

  let store: TestStore<AuthUserState>;

  const mockAuth: AuthState = {
    loggedIn: true,
    errorMessage: 'This is just a Test',
    message: 'test',
    isSoftwareToken: true,
    email: 'test@test.com',
    name: 'Atonix Test',
    authState: 'login'
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot([])],
      providers: [
        AuthEffects,
        RouterFacade,
        {
          provide: Actions,
          useFactory: getActions
        },
        {
          provide: AuthService,
          useValue: {
            GetPoolInfo: jest.fn(),
            Login: jest.fn(),
            CompleteInitialPassword: jest.fn(),
            ConfirmPassword: jest.fn(),
            ForgotPassword: jest.fn(),
            FinishLoginSoftwareToken: jest.fn(),
            InitializeUser: jest.fn()
          }
        },
        {
          provide: Store,
          useClass: TestStore
        }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
  });

  beforeEach(inject([Store], (testStore: TestStore<AuthUserState>) => {
    store = testStore; // save store reference for use in tests
    store.setState(mockAuthUserState); // set default state
  }));

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('getSettings$', () => {
    it('should return Client Id and Pool Id', () => {
      const action = new authActions.GetSettings(true);
      const mockResponseValues = { client: 'test1234567891234567891234', pool: 'us-east-1_test12345' };
      const outcome = new authActions.GetSettingsComplete({
        ClientID: mockResponseValues.client,
        PoolID: mockResponseValues.pool
      });

      actions.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: mockResponseValues });
      const expected = cold('--b', { b: outcome });
      authService.GetPoolInfo = jest.fn(() => response);

      expect(effects.getSettings$).toBeObservable(expected);
    });
  });

  describe('login$', () => {
    it('should login successfully', () => {
      const spy = spyOn(store, 'dispatch');
      const action = new authActions.Login({ username: 'atonixTest', password: '12345678', rememberMe: true });
      const outcome = new authActions.LoginSuccess();

      actions.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: { Status: 0 } });
      const expected = cold('--b', { b: outcome });
      authService.Login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('initialPW$', () => {
    it('should login successfully', () => {
      const action = new authActions.InitialPassword({
        name: 'Atonix Test',
        username: 'atonixTest',
        password: '12345678',
        rememberMe: true
      });
      const outcome = new authActions.LoginSuccess();

      actions.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: { Status: 0 } });
      const expected = cold('--b', { b: outcome });
      authService.CompleteInitialPassword = jest.fn(() => response);

      expect(effects.initialPW$).toBeObservable(expected);
    });
  });

  describe('changePassword$', () => {
    it('should return login info', () => {
      const spy = spyOn(store, 'dispatch');
      const action = new authActions.ChangePassword({
        email: 'test@test.com',
        code: 'atonixTest123',
        password: '12345678',
        rememberMe: true
      });
      const mockResponseValues = Observable.create(observer => {
        observer.next(5);
      });
      const outcome = new authActions.Login({ username: 'test@test.com', password: '12345678', rememberMe: true });

      actions.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: mockResponseValues });
      const expected = cold('--b', { b: outcome });
      authService.ConfirmPassword = jest.fn(() => response);

      expect(effects.changePassword$).toBeObservable(expected);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('requestPassword$', () => {
    it('should request password successfully', () => {
      const spy = spyOn(store, 'dispatch');
      const action = new authActions.RequestPassword('test@test.com');
      const outcome = new authActions.RequestPasswordComplete('test@test.com');

      actions.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: true });
      const expected = cold('--b', { b: outcome });
      authService.ForgotPassword = jest.fn(() => response);

      expect(effects.requestPassword$).toBeObservable(expected);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('sendMfa', () => {
    it('should send mfa', () => {
      const spy = spyOn(store, 'dispatch');
      const action = new authActions.SendMfa('atonixTest13');
      const outcome = new authActions.LoginSuccess();

      actions.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: true });
      const expected = cold('--b', { b: outcome });
      authService.FinishLoginSoftwareToken = jest.fn(() => response);

      expect(effects.sendMfa).toBeObservable(expected);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('initializeUser', () => {
    it('should initialize user', () => {
      const action = new authActions.InitializeUser('test@test.com');
      const outcome = new authActions.InitialPasswordRequired('test@test.com', true);

      actions.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: true });
      const expected = cold('--b', { b: outcome });
      authService.InitializeUser = jest.fn(() => response);

      expect(effects.initializeUser).toBeObservable(expected);
    });
  });
});
