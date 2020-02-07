export var UserActionTypes;
(function (UserActionTypes) {
    UserActionTypes["LoadUserInfo"] = "[User] Load User Info";
    UserActionTypes["UserInfoLoaded"] = "[User] User Info Loaded";
    UserActionTypes["UserInfoFail"] = "[User] User Info Fail";
    UserActionTypes["LoadAppContext"] = "[User] Load App Context";
    UserActionTypes["AppContextLoaded"] = "[User] App Context Loaded";
    UserActionTypes["AppContextFail"] = "[User] App Context Fail";
    UserActionTypes["ClearUser"] = "[User] Clear User";
    UserActionTypes["SetInitialAppContext"] = "[User] Set Initial App Context";
    UserActionTypes["SetAppContext"] = "[User] Set App Context";
    UserActionTypes["SetAppContextSuccess"] = "[User] Set App Context Success";
    UserActionTypes["NavigateToNewApp"] = "[User] Navigate to New App";
    UserActionTypes["SetAppContextsForApp"] = "[User] Set App Contexts For App";
})(UserActionTypes || (UserActionTypes = {}));
var LoadUserInfo = /** @class */ (function () {
    function LoadUserInfo() {
        this.type = UserActionTypes.LoadUserInfo;
    }
    return LoadUserInfo;
}());
export { LoadUserInfo };
var UserInfoLoaded = /** @class */ (function () {
    function UserInfoLoaded(payload) {
        this.payload = payload;
        this.type = UserActionTypes.UserInfoLoaded;
    }
    return UserInfoLoaded;
}());
export { UserInfoLoaded };
var UserInfoFail = /** @class */ (function () {
    function UserInfoFail(payload) {
        this.payload = payload;
        this.type = UserActionTypes.UserInfoFail;
    }
    return UserInfoFail;
}());
export { UserInfoFail };
var LoadAppContext = /** @class */ (function () {
    function LoadAppContext() {
        this.type = UserActionTypes.LoadAppContext;
    }
    return LoadAppContext;
}());
export { LoadAppContext };
var AppContextLoaded = /** @class */ (function () {
    function AppContextLoaded(payload) {
        this.payload = payload;
        this.type = UserActionTypes.AppContextLoaded;
    }
    return AppContextLoaded;
}());
export { AppContextLoaded };
var AppContextFail = /** @class */ (function () {
    function AppContextFail(payload) {
        this.payload = payload;
        this.type = UserActionTypes.AppContextFail;
    }
    return AppContextFail;
}());
export { AppContextFail };
var ClearUser = /** @class */ (function () {
    function ClearUser() {
        this.type = UserActionTypes.ClearUser;
    }
    return ClearUser;
}());
export { ClearUser };
var SetAppContext = /** @class */ (function () {
    function SetAppContext(payload) {
        this.payload = payload;
        this.type = UserActionTypes.SetAppContext;
    }
    return SetAppContext;
}());
export { SetAppContext };
var SetAppContextSuccess = /** @class */ (function () {
    function SetAppContextSuccess(payload) {
        this.payload = payload;
        this.type = UserActionTypes.SetAppContextSuccess;
    }
    return SetAppContextSuccess;
}());
export { SetAppContextSuccess };
var SetInitialAppContext = /** @class */ (function () {
    function SetInitialAppContext(payload) {
        this.payload = payload;
        this.type = UserActionTypes.SetInitialAppContext;
    }
    return SetInitialAppContext;
}());
export { SetInitialAppContext };
var NavigateToNewApp = /** @class */ (function () {
    function NavigateToNewApp(payload) {
        this.payload = payload;
        this.type = UserActionTypes.NavigateToNewApp;
    }
    return NavigateToNewApp;
}());
export { NavigateToNewApp };
//# sourceMappingURL=user.actions.js.map