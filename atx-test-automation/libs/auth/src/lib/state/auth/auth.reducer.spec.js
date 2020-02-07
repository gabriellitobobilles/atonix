import * as tslib_1 from "tslib";
/*REDUCER*/
import { authReducer, initialState } from './auth.reducer';
/*ACTIONS*/
import * as actions from './auth.actions';
describe('Auth Reducer', function () {
    describe('[Auth] Login Started', function () {
        it('should toggle state', function () {
            var action = new actions.LoginStarted('test@test.com');
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { errorMessage: null, email: 'test@test.com', message: 'Authenticating ...', authState: 'working' }));
        });
    });
    describe('[Auth] Login Success', function () {
        it('should toggle state', function () {
            var action = new actions.LoginSuccess();
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { loggedIn: true, errorMessage: null, message: 'Authenticated!', authState: 'navigate' }));
        });
    });
    describe('[Auth] MFA Requred', function () {
        it('should toggle state', function () {
            var action = new actions.MFARequired('test');
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { loggedIn: false, errorMessage: null, message: null, isSoftwareToken: true, authState: 'mfa' }));
        });
    });
    describe('[Auth] Login Failure', function () {
        it('should toggle state', function () {
            var action = new actions.LoginFailure('test');
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { loggedIn: false, errorMessage: 'Login Error', message: null, authState: 'login' }));
        });
    });
    describe('[Auth] Logout Complete', function () {
        it('should toggle state', function () {
            var action = new actions.LogoutComplete();
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { loggedIn: false, errorMessage: null, message: null, authState: 'login' }));
        });
    });
    describe('[Auth] Initial Auth Action', function () {
        it('should toggle state', function () {
            var action = new actions.InitialAuthAction(true);
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { loggedIn: true, errorMessage: null, message: null, authState: 'login' }));
        });
    });
    describe('[Auth] Forgot Password', function () {
        it('should toggle state', function () {
            var action = new actions.ForgotPassword('test@test.com');
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { errorMessage: null, message: null, email: 'test@test.com', authState: 'requestpw' }));
        });
    });
    describe('[Auth] Request Password Cancelled', function () {
        it('should toggle state', function () {
            var action = new actions.RequestPasswordCancelled(true);
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { authState: 'login' }));
        });
    });
    describe('[Auth] Request Password Complete', function () {
        it('should toggle state', function () {
            var action = new actions.RequestPasswordComplete('test@test.com');
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { email: 'test@test.com', authState: 'changepw' }));
        });
    });
    describe('[Auth] Password Change Required', function () {
        it('should toggle state', function () {
            var action = new actions.PasswordChangeRequired('test@test.com');
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { email: 'test@test.com', authState: 'changepw' }));
        });
    });
    describe('[Auth] Change Password Cancelled', function () {
        it('should toggle state', function () {
            var action = new actions.ChangePasswordCancelled(true);
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { authState: 'login' }));
        });
    });
    describe('[Auth] Change Password Complete', function () {
        it('should toggle state', function () {
            var action = new actions.ChangePasswordComplete(true);
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { loggedIn: true, errorMessage: null, message: 'Authenticated!', authState: 'navigate' }));
        });
    });
    describe('[Auth] Initial Password Required', function () {
        it('should toggle state', function () {
            var action = new actions.InitialPasswordRequired('test@test.com', 'UserExists');
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { email: 'test@test.com', message: 'Could not reset password.', authState: 'login' }));
        });
    });
    describe('[Auth] Initial Password Change Required', function () {
        it('should toggle state', function () {
            var action = new actions.InitialPasswordChangeRequired({ email: 'test@test.com', name: 'Atonix Test' });
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { email: 'test@test.com', name: 'Atonix Test', authState: 'initialpw' }));
        });
    });
    describe('[Auth] Initial Password Cancelled', function () {
        it('should toggle state', function () {
            var action = new actions.InitialPasswordCancelled(true);
            var result = authReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { authState: 'login' }));
        });
    });
    describe('[Auth] Get Settings Complete', function () {
        it('should toggle state', function () {
            var action = new actions.GetSettingsComplete({
                ClientID: 'test1234567891234567891234',
                PoolID: 'us-east-1_test12345'
            });
            var result = authReducer(initialState, action);
            expect(result).toEqual(initialState);
        });
    });
});
//# sourceMappingURL=auth.reducer.spec.js.map