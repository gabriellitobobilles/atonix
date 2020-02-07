import * as tslib_1 from "tslib";
/*ANGULAR*/
import { Actions } from '@ngrx/effects';
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
var TestActions = /** @class */ (function (_super) {
    tslib_1.__extends(TestActions, _super);
    function TestActions() {
        return _super.call(this) || this;
    }
    Object.defineProperty(TestActions.prototype, "stream", {
        set: function (source) {
            /* See https://github.com/tomastrajan/angular-ngrx-material-starter/issues/299 */
            /*tslint:disable-next-line */
            this.source = source;
        },
        enumerable: true,
        configurable: true
    });
    return TestActions;
}(Actions));
export { TestActions };
export function getActions() {
    return new TestActions();
}
describe('UserEffects', function () {
    var actions;
    var effects;
    var userInfoService;
    var assetsModelService;
    beforeEach(function () {
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
    it('should create', function () {
        expect(effects).toBeTruthy();
    });
    describe('loadUserInfo', function () {
        it('should return user info', function () {
            var accountModelUser = {
                Email: 'test@test.com',
                FirstName: 'test',
                LastName: 'test',
                DisplayName: 'test',
                UserName: 'test',
                IsBV: true,
                NERCCIP: true,
                ServiceAccount: true
            };
            var action = new userActions.LoadUserInfo();
            var outcome = new userActions.UserInfoLoaded(accountModelUser);
            actions.stream = hot('-a', { a: action });
            var response = cold('-a|', { a: accountModelUser });
            var expected = cold('--b', { b: outcome });
            userInfoService.userInfo = jest.fn(function () { return response; });
            expect(effects.loadUserInfo).toBeObservable(expected);
        });
    });
    describe('loadAppContext', function () {
        it('should return app context', function () {
            var mockAppContext = [
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
            var action = new userActions.LoadAppContext();
            var outcome = new userActions.AppContextLoaded(mockAppContext);
            actions.stream = hot('-a', { a: action });
            var response = cold('-a|', { a: mockAppContext });
            var expected = cold('--b', { b: outcome });
            assetsModelService.getAppContexts = jest.fn(function () { return response; });
            expect(effects.loadAppContext).toBeObservable(expected);
        });
    });
    describe('init$', function () {
        it('should return auth config', function () {
            var outcome = new userActions.SetInitialAppContext({ appContext: 123, permittedAppContexts: [1, 2, 3] });
            var expected = cold('(-a|)', { a: outcome });
            expect(effects.init$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=user.effects.spec.js.map