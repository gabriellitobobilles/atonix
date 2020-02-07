/*ANGULAR*/
import { BehaviorSubject } from 'rxjs';
import { async, TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
/*FACADE*/
import { AuthFacade } from './auth.facade';
/*ACTIONS*/
import * as actions from './auth.actions';
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
describe('Auth Facade', function () {
    var store;
    var mockAuth = {
        loggedIn: true,
        errorMessage: 'This is just a Test',
        message: 'test',
        isSoftwareToken: true,
        email: 'test@test.com',
        name: 'Atonix Test',
        authState: 'login',
        timeoutInSeconds: -1
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
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            providers: [
                AuthFacade,
                { provide: Store, useClass: TestStore } // use test store instead of ngrx store
            ]
        }).compileComponents();
    }));
    beforeEach(inject([Store], function (testStore) {
        store = testStore; // save store reference for use in tests
        store.setState(mockAuthUserState); // set default state
    }));
    it('should create', inject([AuthFacade], function (authFacade) {
        expect(authFacade).toBeTruthy();
    }));
    it('should log in', inject([AuthFacade], function (authFacade) {
        var spy = spyOn(store, 'dispatch');
        authFacade.login('atonixTest', '12345678', true);
        expect(spy).toHaveBeenCalledWith(new actions.Login({ username: 'atonixTest', password: '12345678', rememberMe: true }));
    }));
    it('should send mfa', inject([AuthFacade], function (authFacade) {
        var spy = spyOn(store, 'dispatch');
        authFacade.sendMfa('atonixTest123');
        expect(spy).toHaveBeenCalledWith(new actions.SendMfa('atonixTest123'));
    }));
    it('should initialize auth action', inject([AuthFacade], function (authFacade) {
        var spy = spyOn(store, 'dispatch');
        authFacade.initialAuthAction(true);
        expect(spy).toHaveBeenCalledWith(new actions.InitialAuthAction(true));
    }));
    it('should login success redirect', inject([AuthFacade], function (authFacade) {
        var spy = spyOn(store, 'dispatch');
        authFacade.loginSuccessRedirect();
        expect(spy).toHaveBeenCalledWith(new actions.LoginSuccessRedirect());
    }));
    it('should login redirect', inject([AuthFacade], function (authFacade) {
        var spy = spyOn(store, 'dispatch');
        authFacade.loginRedirect();
        expect(spy).toHaveBeenCalledWith(new actions.LoginRedirect());
    }));
    it('should log out', inject([AuthFacade], function (authFacade) {
        var spy = spyOn(store, 'dispatch');
        authFacade.logout();
        expect(spy).toHaveBeenCalledWith(new actions.Logout());
    }));
    it('should forgot password', inject([AuthFacade], function (authFacade) {
        var spy = spyOn(store, 'dispatch');
        authFacade.forgotPassword('test@test.com');
        expect(spy).toHaveBeenCalledWith(new actions.ForgotPassword('test@test.com'));
    }));
    it('should request password', inject([AuthFacade], function (authFacade) {
        var spy = spyOn(store, 'dispatch');
        authFacade.requestPassword('test@test.com');
        expect(spy).toHaveBeenCalledWith(new actions.RequestPassword('test@test.com'));
    }));
    it('should request password cancelled', inject([AuthFacade], function (authFacade) {
        var spy = spyOn(store, 'dispatch');
        authFacade.requestPasswordCancelled();
        expect(spy).toHaveBeenCalledWith(new actions.RequestPasswordCancelled());
    }));
    it('should request password complete', inject([AuthFacade], function (authFacade) {
        var spy = spyOn(store, 'dispatch');
        authFacade.requestPasswordComplete('test@test.com');
        expect(spy).toHaveBeenCalledWith(new actions.RequestPasswordComplete('test@test.com'));
    }));
    it('should change password', inject([AuthFacade], function (authFacade) {
        var passwordChange = {
            email: 'test@test.com',
            password: '12345678',
            code: 'atonixTest123',
            rememberMe: true
        };
        var spy = spyOn(store, 'dispatch');
        authFacade.changePassword(passwordChange);
        expect(spy).toHaveBeenCalledWith(new actions.ChangePassword(passwordChange));
    }));
    it('should change password cancelled', inject([AuthFacade], function (authFacade) {
        var spy = spyOn(store, 'dispatch');
        authFacade.changePasswordCancelled();
        expect(spy).toHaveBeenCalledWith(new actions.ChangePasswordCancelled());
    }));
    it('should initial password', inject([AuthFacade], function (authFacade) {
        var initialPassword = {
            username: 'atonixTest',
            password: '12345678',
            name: 'Atonix Test',
            rememberMe: true
        };
        var spy = spyOn(store, 'dispatch');
        authFacade.initialPassword(initialPassword);
        expect(spy).toHaveBeenCalledWith(new actions.InitialPassword(initialPassword));
    }));
    it('should initial password cancelled', inject([AuthFacade], function (authFacade) {
        var spy = spyOn(store, 'dispatch');
        authFacade.initialPasswordCancelled();
        expect(spy).toHaveBeenCalledWith(new actions.InitialPasswordCancelled());
    }));
    it('should get cognito settings', inject([AuthFacade], function (authFacade) {
        var spy = spyOn(store, 'dispatch');
        authFacade.getCognitoSettings();
        expect(spy).toHaveBeenCalledWith(new actions.GetSettings());
    }));
});
//# sourceMappingURL=auth.facade.spec.js.map