import * as tslib_1 from "tslib";
import { AuthActionTypes } from './auth.actions';
export var initialState = {
    loggedIn: false,
    errorMessage: null,
    message: null,
    isSoftwareToken: false,
    email: null,
    name: null,
    timeoutInSeconds: -1,
    authState: 'login'
};
export function authReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case AuthActionTypes.LoginStarted: {
            return tslib_1.__assign({}, state, { errorMessage: null, email: action.payload || state.email, message: 'Authenticating ...', authState: 'working' });
        }
        case AuthActionTypes.LoginSuccess: {
            return tslib_1.__assign({}, state, { loggedIn: true, errorMessage: null, message: 'Authenticated!', authState: 'navigate' });
        }
        case AuthActionTypes.MFARequired: {
            var softwareToken = action.challenge ? true : false;
            return tslib_1.__assign({}, state, { loggedIn: false, errorMessage: null, message: null, isSoftwareToken: softwareToken, authState: 'mfa' });
        }
        case AuthActionTypes.LoginFailure: {
            var message = 'Login Error';
            if (action && action.payload && action.payload.code === 'UserNotFoundException') {
                message = 'Username or password not found.';
            }
            else if (action && action.payload && action.payload.code === 'NotAuthorizedException') {
                message = 'Check username and password.';
            }
            return tslib_1.__assign({}, state, { loggedIn: false, errorMessage: message, message: null, authState: 'login' });
        }
        case AuthActionTypes.LogoutComplete: {
            return tslib_1.__assign({}, state, { loggedIn: false, errorMessage: null, message: null, authState: 'login' });
        }
        case AuthActionTypes.InitialAuthAction: {
            return tslib_1.__assign({}, state, { loggedIn: action.payload, errorMessage: null, message: null, authState: 'login' });
        }
        case AuthActionTypes.ForgotPassword: {
            return tslib_1.__assign({}, state, { errorMessage: null, message: null, email: action.email, authState: 'requestpw' });
        }
        case AuthActionTypes.RequestPasswordCancelled: {
            return tslib_1.__assign({}, state, { authState: 'login' });
        }
        case AuthActionTypes.RequestPasswordComplete: {
            return tslib_1.__assign({}, state, { email: action.payload, authState: 'changepw' });
        }
        case AuthActionTypes.PasswordChangeRequired: {
            return tslib_1.__assign({}, state, { email: action.payload, authState: 'changepw' });
        }
        case AuthActionTypes.ChangePasswordCancelled: {
            return tslib_1.__assign({}, state, { authState: 'login' });
        }
        case AuthActionTypes.ChangePasswordComplete: {
            return tslib_1.__assign({}, state, { loggedIn: true, errorMessage: null, message: 'Authenticated!', authState: 'navigate' });
        }
        case AuthActionTypes.InitialPasswordRequired: {
            var message = null;
            if (action.result === 'NoUser') {
                message = 'Contact support@atonix.com to create an account.';
            }
            else if (action.result === 'UserExists') {
                message = 'Could not reset password.';
            }
            else if (action.result) {
                message = 'Error resetting password.';
            }
            else {
                message = 'A temporary password has been sent to ' + action.email;
            }
            return tslib_1.__assign({}, state, { email: action.email, message: message, authState: 'login' });
        }
        case AuthActionTypes.InitialPasswordChangeRequired: {
            return tslib_1.__assign({}, state, { email: action.attributes.email, name: action.attributes.name, authState: 'initialpw' });
        }
        case AuthActionTypes.InitialPasswordCancelled: {
            return tslib_1.__assign({}, state, { authState: 'login' });
        }
        case AuthActionTypes.GetSettingsComplete: {
            return state;
        }
        case AuthActionTypes.GetTimeoutSettingComplete: {
            return tslib_1.__assign({}, state, { timeoutInSeconds: action.payload });
        }
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=auth.reducer.js.map