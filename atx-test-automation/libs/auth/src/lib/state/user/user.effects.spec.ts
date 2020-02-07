/*ANGULAR*/
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { RouterFacade } from '@AtonixWebSites/ngrx-router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { hot, cold } from 'jasmine-marbles';
/*SERVICES*/
import { UserInfoService } from '../../services/user-info.service';
import { AssetsModelService } from '@AtonixWebSites/api';
import { InitialStateService } from '../../services/initial-state.service';
import { AuthConfigService } from '../../services/auth-config.service';
/*EFFECTS*/
import { UserEffects } from './user.effects';
/*ACTIONS*/
import * as userActions from './user.actions';

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

describe('UserEffects', () => {
  let actions: TestActions;
  let effects: UserEffects;
  let userInfoService: UserInfoService;
  let assetsModelService: AssetsModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, StoreModule.forRoot([])],
      providers: [
        UserEffects,
        RouterFacade,
        Store,
        InitialStateService,
        {
          provide: AuthConfigService,
          useValue: {
            appContext: 123,
            permittedAppContexts: [1, 2, 3]
          }
        },
        {
          provide: Actions,
          useFactory: getActions
        },
        {
          provide: UserInfoService,
          useValue: {
            userInfo: jest.fn()
          }
        },
        {
          provide: AssetsModelService,
          useValue: {
            getAppContexts: jest.fn()
          }
        }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(UserEffects);
    userInfoService = TestBed.get(UserInfoService);
    assetsModelService = TestBed.get(AssetsModelService);
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadUserInfo', () => {
    it('should return user info', () => {
      const accountModelUser = {
        Email: 'test@test.com',
        FirstName: 'test',
        LastName: 'test',
        DisplayName: 'test',
        UserName: 'test',
        IsBV: true,
        NERCCIP: true,
        ServiceAccount: true
      };
      const action = new userActions.LoadUserInfo();
      const outcome = new userActions.UserInfoLoaded(accountModelUser);

      actions.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: accountModelUser });
      const expected = cold('--b', { b: outcome });
      userInfoService.userInfo = jest.fn(() => response);

      expect(effects.loadUserInfo).toBeObservable(expected);
    });
  });

  describe('loadAppContext', () => {
    it('should return app context', () => {
      const mockAppContext = [
        {
          AppContextID: 1,
          Name: 'Atonix Test',
          Icon: 'testIcon',
          DisplayName: 'Atonix Test',
          DisplayOrder: 1,
          SecurityResourceID: 2,
          Path: 'testPath',
          OpenInNew: true,
          StopAtLevel: 3,
          ShowFuture: true,
          Tabs: null,
          TimeRange: 'test',
          TimeSelection: 'test',
          Locale: 'test',
          StartAsset: 4,
          Refresh: 5
        }
      ];
      const action = new userActions.LoadAppContext();
      const outcome = new userActions.AppContextLoaded(mockAppContext);

      actions.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: mockAppContext });
      const expected = cold('--b', { b: outcome });
      assetsModelService.getAppContexts = jest.fn(() => response);

      expect(effects.loadAppContext).toBeObservable(expected);
    });
  });

  describe('init$', () => {
    it('should return auth config', () => {
      const outcome = new userActions.SetInitialAppContext({ appContext: 123, permittedAppContexts: [1, 2, 3] });

      const expected = cold('(-a|)', { a: outcome });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
