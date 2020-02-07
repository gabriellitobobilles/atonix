/*ANGULAR*/
import { BehaviorSubject, Observable } from 'rxjs';
import { async, TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
/*MODEL*/
import { AuthUserState } from '..';
/*FACADE*/
import { UserFacade } from './user.facade';
/*REDUCERS*/
import { AuthState } from '../auth/auth.reducer';
import { UserState } from './user.reducer';
/*ACTIONS*/
import * as actions from './user.actions';

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

describe('User Facade', () => {
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UserFacade,
        { provide: Store, useClass: TestStore } // use test store instead of ngrx store
      ]
    }).compileComponents();
  }));

  beforeEach(inject([Store], (testStore: TestStore<AuthUserState>) => {
    store = testStore; // save store reference for use in tests
    store.setState(mockAuthUserState); // set default state
  }));

  it('should create', inject([UserFacade], (userFacade: UserFacade) => {
    expect(userFacade).toBeTruthy();
  }));

  it('should load App Contexts', inject([UserFacade], (userFacade: UserFacade) => {
    const spy = spyOn(store, 'dispatch');
    userFacade.loadAppContexts();
    expect(spy).toHaveBeenCalledWith(new actions.LoadAppContext());
  }));

  it('should set App Context', inject([UserFacade], (userFacade: UserFacade) => {
    const spy = spyOn(store, 'dispatch');
    userFacade.setAppContext(1);
    expect(spy).toHaveBeenCalledWith(new actions.SetAppContext(1));
  }));

  it('should clear User', inject([UserFacade], (userFacade: UserFacade) => {
    const spy = spyOn(store, 'dispatch');
    userFacade.clearUser();
    expect(spy).toHaveBeenCalledWith(new actions.ClearUser());
  }));

  it('should load User Info', inject([UserFacade], (userFacade: UserFacade) => {
    const spy = spyOn(store, 'dispatch');
    userFacade.loadUserInfo();
    expect(spy).toHaveBeenCalledWith(new actions.LoadUserInfo());
  }));

  it('should app Loaded', inject([UserFacade], (userFacade: UserFacade) => {
    const spy = spyOn(store, 'dispatch');
    userFacade.appLoaded(1);
    expect(spy).toHaveBeenCalledWith(new actions.SetAppContextSuccess(1));
  }));
});
