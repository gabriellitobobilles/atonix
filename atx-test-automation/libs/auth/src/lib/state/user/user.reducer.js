import * as tslib_1 from "tslib";
import { UserActionTypes } from './user.actions';
export var initialState = {
    accountModelUser: null,
    appContexts: null,
    selectedAppContext: null,
    appContextsForApp: [],
    errorMessage: '',
    lightTheme: false
};
export function userReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case UserActionTypes.UserInfoLoaded: {
            return tslib_1.__assign({}, state, { errorMessage: '', accountModelUser: action.payload });
        }
        case UserActionTypes.UserInfoFail: {
            return tslib_1.__assign({}, state, { errorMessage: action.payload, accountModelUser: null });
        }
        case UserActionTypes.AppContextLoaded: {
            return tslib_1.__assign({}, state, { errorMessage: '', appContexts: action.payload });
        }
        case UserActionTypes.AppContextFail: {
            return tslib_1.__assign({}, state, { errorMessage: action.payload, appContexts: null });
        }
        case UserActionTypes.ClearUser: {
            return tslib_1.__assign({}, state, { appContexts: null, accountModelUser: null, errorMessage: '' });
        }
        case UserActionTypes.SetAppContextSuccess: {
            return tslib_1.__assign({}, state, { selectedAppContext: action.payload });
        }
        case UserActionTypes.SetInitialAppContext: {
            return tslib_1.__assign({}, state, { selectedAppContext: action.payload.appContext, appContextsForApp: action.payload.permittedAppContexts });
        }
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=user.reducer.js.map