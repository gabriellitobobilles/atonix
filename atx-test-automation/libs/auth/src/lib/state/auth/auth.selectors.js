import { createSelector } from '@ngrx/store';
import { getAuthUserState } from '..';
export var getAuth = createSelector(getAuthUserState, function (state) { return state.auth; });
export var getAuthState = createSelector(getAuth, function (authState) { return authState.authState; });
export var getErrorMessage = createSelector(getAuth, function (authState) { return authState.errorMessage; });
export var getMessage = createSelector(getAuth, function (authState) { return authState.message; });
export var getIsSoftwareToken = createSelector(getAuth, function (authState) { return authState.isSoftwareToken; });
export var getLoggedIn = createSelector(getAuth, function (authState) { return authState.loggedIn; });
export var getEmail = createSelector(getAuth, function (authState) { return authState.email; });
export var getName = createSelector(getAuth, function (authState) { return authState.name; });
export var getTimeoutInSeconds = createSelector(getAuth, function (authState) { return authState.timeoutInSeconds; });
export var getAuthUser = createSelector(getAuth, function (authState) {
    if (authState.loggedIn) {
        return null;
    }
    else {
        return null;
    }
});
export var authQuery = {
    getAuth: getAuth,
    getErrorMessage: getErrorMessage,
    getLoggedIn: getLoggedIn,
    getAuthState: getAuthState,
    getAuthUser: getAuthUser,
    getTimeoutInSeconds: getTimeoutInSeconds,
    getMessage: getMessage,
    getIsSoftwareToken: getIsSoftwareToken,
    getEmail: getEmail,
    getName: getName
};
//# sourceMappingURL=auth.selectors.js.map