import * as tslib_1 from "tslib";
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
var TestStore = /** @class */ (function () {
    function TestStore() {
        this.state = new BehaviorSubject(undefined);
    }
    TestStore.prototype.setState = function (data) {
        this.state.next(data);
    };
    TestStore.prototype.select = function (selector) {
        return this.state.asObservable();
    };
    TestStore.prototype.pipe = function (selector) {
        return this.state.asObservable();
    };
    TestStore.prototype.dispatch = function (action) { };
    return TestStore;
}());
export { TestStore };
describe('Auth Effects', function () {
    var actions;
    var effects;
    var authService;
    var store;
    var mockAuth = {
        loggedIn: true,
        errorMessage: 'This is just a Test',
        message: 'test',
        isSoftwareToken: true,
        email: 'test@test.com',
        name: 'Atonix Test',
        authState: 'login'
    };
    var mockUser = {
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
    var mockAuthUserState = { user: mockUser, auth: mockAuth };
    beforeEach(function () {
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
    beforeEach(inject([Store], function (testStore) {
        store = testStore; // save store reference for use in tests
        store.setState(mockAuthUserState); // set default state
    }));
    it('should create', function () {
        expect(effects).toBeTruthy();
    });
    describe('getSettings$', function () {
        it('should return Client Id and Pool Id', function () {
            var action = new authActions.GetSettings(true);
            var mockResponseValues = { client: 'test1234567891234567891234', pool: 'us-east-1_test12345' };
            var outcome = new authActions.GetSettingsComplete({
                ClientID: mockResponseValues.client,
                PoolID: mockResponseValues.pool
            });
            actions.stream = hot('-a', { a: action });
            var response = cold('-a|', { a: mockResponseValues });
            var expected = cold('--b', { b: outcome });
            authService.GetPoolInfo = jest.fn(function () { return response; });
            expect(effects.getSettings$).toBeObservable(expected);
        });
    });
    describe('login$', function () {
        it('should login successfully', function () {
            var spy = spyOn(store, 'dispatch');
            var action = new authActions.Login({ username: 'atonixTest', password: '12345678', rememberMe: true });
            var outcome = new authActions.LoginSuccess();
            actions.stream = hot('-a', { a: action });
            var response = cold('-a|', { a: { Status: 0 } });
            var expected = cold('--b', { b: outcome });
            authService.Login = jest.fn(function () { return response; });
            expect(effects.login$).toBeObservable(expected);
            expect(spy).toHaveBeenCalled();
        });
    });
    describe('initialPW$', function () {
        it('should login successfully', function () {
            var action = new authActions.InitialPassword({
                name: 'Atonix Test',
                username: 'atonixTest',
                password: '12345678',
                rememberMe: true
            });
            var outcome = new authActions.LoginSuccess();
            actions.stream = hot('-a', { a: action });
            var response = cold('-a|', { a: { Status: 0 } });
            var expected = cold('--b', { b: outcome });
            authService.CompleteInitialPassword = jest.fn(function () { return response; });
            expect(effects.initialPW$).toBeObservable(expected);
        });
    });
    describe('changePassword$', function () {
        it('should return login info', function () {
            var spy = spyOn(store, 'dispatch');
            var action = new authActions.ChangePassword({
                email: 'test@test.com',
                code: 'atonixTest123',
                password: '12345678',
                rememberMe: true
            });
            var mockResponseValues = Observable.create(function (observer) {
                observer.next(5);
            });
            var outcome = new authActions.Login({ username: 'test@test.com', password: '12345678', rememberMe: true });
            actions.stream = hot('-a', { a: action });
            var response = cold('-a|', { a: mockResponseValues });
            var expected = cold('--b', { b: outcome });
            authService.ConfirmPassword = jest.fn(function () { return response; });
            expect(effects.changePassword$).toBeObservable(expected);
            expect(spy).toHaveBeenCalled();
        });
    });
    describe('requestPassword$', function () {
        it('should request password successfully', function () {
            var spy = spyOn(store, 'dispatch');
            var action = new authActions.RequestPassword('test@test.com');
            var outcome = new authActions.RequestPasswordComplete('test@test.com');
            actions.stream = hot('-a', { a: action });
            var response = cold('-a|', { a: true });
            var expected = cold('--b', { b: outcome });
            authService.ForgotPassword = jest.fn(function () { return response; });
            expect(effects.requestPassword$).toBeObservable(expected);
            expect(spy).toHaveBeenCalled();
        });
    });
    describe('sendMfa', function () {
        it('should send mfa', function () {
            var spy = spyOn(store, 'dispatch');
            var action = new authActions.SendMfa('atonixTest13');
            var outcome = new authActions.LoginSuccess();
            actions.stream = hot('-a', { a: action });
            var response = cold('-a|', { a: true });
            var expected = cold('--b', { b: outcome });
            authService.FinishLoginSoftwareToken = jest.fn(function () { return response; });
            expect(effects.sendMfa).toBeObservable(expected);
            expect(spy).toHaveBeenCalled();
        });
    });
    describe('initializeUser', function () {
        it('should initialize user', function () {
            var action = new authActions.InitializeUser('test@test.com');
            var outcome = new authActions.InitialPasswordRequired('test@test.com', true);
            actions.stream = hot('-a', { a: action });
            var response = cold('-a|', { a: true });
            var expected = cold('--b', { b: outcome });
            authService.InitializeUser = jest.fn(function () { return response; });
            expect(effects.initializeUser).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=auth.effects.spec.js.map