export var AuthActionTypes;
(function (AuthActionTypes) {
    AuthActionTypes["GetSettings"] = "[Auth] Get Settings";
    AuthActionTypes["GetSettingsComplete"] = "[Auth] Get Settings Complete";
    AuthActionTypes["InitialAuthAction"] = "[Auth] Initial Auth Action";
    AuthActionTypes["Login"] = "[Auth] Login";
    AuthActionTypes["LoginStarted"] = "[Auth] Login Started";
    AuthActionTypes["LoginSuccess"] = "[Auth] Login Success";
    AuthActionTypes["SendMfa"] = "[Auth] Send Mfa";
    AuthActionTypes["LoginSuccessRedirect"] = "[Auth] Login Success Redirect";
    AuthActionTypes["MFARequired"] = "[Auth] MFA Requred";
    AuthActionTypes["PasswordChangeRequired"] = "[Auth] Password Change Required";
    AuthActionTypes["InitialPasswordRequired"] = "[Auth] Initial Password Required";
    AuthActionTypes["InitialPasswordChangeRequired"] = "[Auth] Initial Password Change Required";
    AuthActionTypes["InitialPassword"] = "[Auth] Initial Password";
    AuthActionTypes["InitialPasswordCancelled"] = "[Auth] Initial Password Cancelled";
    AuthActionTypes["LoginFailure"] = "[Auth] Login Failure";
    AuthActionTypes["LoginRedirect"] = "[Auth] Login Redirect";
    AuthActionTypes["Logout"] = "[Auth] Logout";
    AuthActionTypes["LogoutRedirect"] = "[Auth] Logout Redirect";
    AuthActionTypes["LogoutComplete"] = "[Auth] Logout Complete";
    AuthActionTypes["ForgotPassword"] = "[Auth] Forgot Password";
    AuthActionTypes["RequestPassword"] = "[Auth] Request Password";
    AuthActionTypes["RequestPasswordCancelled"] = "[Auth] Request Password Cancelled";
    AuthActionTypes["RequestPasswordComplete"] = "[Auth] Request Password Complete";
    AuthActionTypes["ChangePassword"] = "[Auth] Change Password";
    AuthActionTypes["ChangePasswordCancelled"] = "[Auth] Change Password Cancelled";
    AuthActionTypes["ChangePasswordComplete"] = "[Auth] Change Password Complete";
    AuthActionTypes["InitializeUser"] = "[Auth] Initialize User";
    AuthActionTypes["UserAuthenticated"] = "[Auth] User Authenticated";
    AuthActionTypes["GetTimeout"] = "[Auth] Get Timeout Setting";
    AuthActionTypes["GetTimeoutSettingError"] = "[Auth] Get Timeout Setting Error";
    AuthActionTypes["GetTimeoutSettingComplete"] = "[Auth] Get Timeout Setting Complete";
    AuthActionTypes["StartInactivityService"] = "[Auth] Start Inactivity Service";
})(AuthActionTypes || (AuthActionTypes = {}));
var GetSettings = /** @class */ (function () {
    function GetSettings(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.GetSettings;
    }
    return GetSettings;
}());
export { GetSettings };
var GetSettingsComplete = /** @class */ (function () {
    function GetSettingsComplete(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.GetSettingsComplete;
    }
    return GetSettingsComplete;
}());
export { GetSettingsComplete };
var InitialAuthAction = /** @class */ (function () {
    function InitialAuthAction(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.InitialAuthAction;
    }
    return InitialAuthAction;
}());
export { InitialAuthAction };
var Login = /** @class */ (function () {
    function Login(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.Login;
    }
    return Login;
}());
export { Login };
var LoginStarted = /** @class */ (function () {
    function LoginStarted(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.LoginStarted;
    }
    return LoginStarted;
}());
export { LoginStarted };
var LoginSuccess = /** @class */ (function () {
    function LoginSuccess() {
        this.type = AuthActionTypes.LoginSuccess;
    }
    return LoginSuccess;
}());
export { LoginSuccess };
var SendMfa = /** @class */ (function () {
    function SendMfa(code) {
        this.code = code;
        this.type = AuthActionTypes.SendMfa;
    }
    return SendMfa;
}());
export { SendMfa };
var LoginSuccessRedirect = /** @class */ (function () {
    function LoginSuccessRedirect() {
        this.type = AuthActionTypes.LoginSuccessRedirect;
    }
    return LoginSuccessRedirect;
}());
export { LoginSuccessRedirect };
var MFARequired = /** @class */ (function () {
    function MFARequired(challenge) {
        this.challenge = challenge;
        this.type = AuthActionTypes.MFARequired;
    }
    return MFARequired;
}());
export { MFARequired };
var PasswordChangeRequired = /** @class */ (function () {
    function PasswordChangeRequired(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.PasswordChangeRequired;
    }
    return PasswordChangeRequired;
}());
export { PasswordChangeRequired };
var InitialPasswordRequired = /** @class */ (function () {
    function InitialPasswordRequired(email, result) {
        this.email = email;
        this.result = result;
        this.type = AuthActionTypes.InitialPasswordRequired;
    }
    return InitialPasswordRequired;
}());
export { InitialPasswordRequired };
var InitialPasswordChangeRequired = /** @class */ (function () {
    function InitialPasswordChangeRequired(attributes) {
        this.attributes = attributes;
        this.type = AuthActionTypes.InitialPasswordChangeRequired;
    }
    return InitialPasswordChangeRequired;
}());
export { InitialPasswordChangeRequired };
var InitialPassword = /** @class */ (function () {
    function InitialPassword(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.InitialPassword;
    }
    return InitialPassword;
}());
export { InitialPassword };
var InitialPasswordCancelled = /** @class */ (function () {
    function InitialPasswordCancelled(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.InitialPasswordCancelled;
    }
    return InitialPasswordCancelled;
}());
export { InitialPasswordCancelled };
var LoginFailure = /** @class */ (function () {
    function LoginFailure(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.LoginFailure;
    }
    return LoginFailure;
}());
export { LoginFailure };
var LoginRedirect = /** @class */ (function () {
    function LoginRedirect() {
        this.type = AuthActionTypes.LoginRedirect;
    }
    return LoginRedirect;
}());
export { LoginRedirect };
var Logout = /** @class */ (function () {
    function Logout() {
        this.type = AuthActionTypes.Logout;
    }
    return Logout;
}());
export { Logout };
var LogoutComplete = /** @class */ (function () {
    function LogoutComplete() {
        this.type = AuthActionTypes.LogoutComplete;
    }
    return LogoutComplete;
}());
export { LogoutComplete };
var ForgotPassword = /** @class */ (function () {
    function ForgotPassword(email) {
        this.email = email;
        this.type = AuthActionTypes.ForgotPassword;
    }
    return ForgotPassword;
}());
export { ForgotPassword };
var RequestPassword = /** @class */ (function () {
    function RequestPassword(email) {
        this.email = email;
        this.type = AuthActionTypes.RequestPassword;
    }
    return RequestPassword;
}());
export { RequestPassword };
var RequestPasswordCancelled = /** @class */ (function () {
    function RequestPasswordCancelled(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.RequestPasswordCancelled;
    }
    return RequestPasswordCancelled;
}());
export { RequestPasswordCancelled };
var RequestPasswordComplete = /** @class */ (function () {
    function RequestPasswordComplete(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.RequestPasswordComplete;
    }
    return RequestPasswordComplete;
}());
export { RequestPasswordComplete };
var ChangePassword = /** @class */ (function () {
    function ChangePassword(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.ChangePassword;
    }
    return ChangePassword;
}());
export { ChangePassword };
var ChangePasswordCancelled = /** @class */ (function () {
    function ChangePasswordCancelled(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.ChangePasswordCancelled;
    }
    return ChangePasswordCancelled;
}());
export { ChangePasswordCancelled };
var ChangePasswordComplete = /** @class */ (function () {
    function ChangePasswordComplete(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.ChangePasswordComplete;
    }
    return ChangePasswordComplete;
}());
export { ChangePasswordComplete };
var InitializeUser = /** @class */ (function () {
    function InitializeUser(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.InitializeUser;
    }
    return InitializeUser;
}());
export { InitializeUser };
var LogoutRedirect = /** @class */ (function () {
    function LogoutRedirect() {
        this.type = AuthActionTypes.LogoutRedirect;
    }
    return LogoutRedirect;
}());
export { LogoutRedirect };
var UserAuthenticated = /** @class */ (function () {
    function UserAuthenticated() {
        this.type = AuthActionTypes.UserAuthenticated;
    }
    return UserAuthenticated;
}());
export { UserAuthenticated };
var GetTimeoutAction = /** @class */ (function () {
    function GetTimeoutAction() {
        this.type = AuthActionTypes.GetTimeout;
    }
    return GetTimeoutAction;
}());
export { GetTimeoutAction };
var GetTimeoutSettingError = /** @class */ (function () {
    function GetTimeoutSettingError(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.GetTimeoutSettingError;
    }
    return GetTimeoutSettingError;
}());
export { GetTimeoutSettingError };
var GetTimeoutSettingComplete = /** @class */ (function () {
    function GetTimeoutSettingComplete(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.GetTimeoutSettingComplete;
    }
    return GetTimeoutSettingComplete;
}());
export { GetTimeoutSettingComplete };
var StartInactivityService = /** @class */ (function () {
    function StartInactivityService(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.StartInactivityService;
    }
    return StartInactivityService;
}());
export { StartInactivityService };
//# sourceMappingURL=auth.actions.js.map