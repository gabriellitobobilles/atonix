import { createSelector } from '@ngrx/store';
import { getAuthUserState } from '..';
export var getUserState = createSelector(getAuthUserState, function (state) { return state.user; });
export var getUser = createSelector(getUserState, function (userState) { return userState.accountModelUser; });
export var getErrorMessage = createSelector(getUserState, function (userState) { return userState.errorMessage; });
export var getAppContexts = createSelector(getUserState, function (userState) { return userState.appContexts; });
export var getLightTheme = createSelector(getUserState, function (userState) { return userState.lightTheme; });
export var getSelectedAppContextID = createSelector(getUserState, function (userState) {
    var result = null;
    if (userState.appContexts) {
        var selectedAC = userState.appContexts.find(function (ac) {
            return ac.DisplayName === userState.selectedAppContext || ac.AppContextID === userState.selectedAppContext;
        });
        result = selectedAC ? selectedAC.AppContextID : null;
    }
    return result;
});
export var getSelectedAppContext = createSelector(getUserState, function (userState) {
    var result = null;
    if (userState.appContexts) {
        result = userState.appContexts.find(function (ac) {
            return ac.DisplayName === userState.selectedAppContext || ac.AppContextID === userState.selectedAppContext;
        });
    }
    return result;
});
export var getAppContextsForApp = createSelector(getUserState, function (userState) { return userState.appContextsForApp; });
export var userQuery = {
    getAppContexts: getAppContexts,
    getUser: getUser,
    getErrorMessage: getErrorMessage,
    getSelectedAppContextID: getSelectedAppContextID,
    getSelectedAppContext: getSelectedAppContext,
    getAppContextsForApp: getAppContextsForApp,
    getLightTheme: getLightTheme
};
//# sourceMappingURL=user.selectors.js.map