import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as cognito from 'amazon-cognito-identity-js';
import { environment } from '@env/environment';
import { AuthFacade } from '../state/auth/auth.facade';
import * as _ from 'lodash';
import { InactivityService } from './inactivity.service';
import { MatDialog } from '@angular/material';
import { ModalCountdownComponent } from '../components/modal-countdown/modal-countdown.component';
import { Router } from '@angular/router';
export var AtonixAuthenticationConstants;
(function (AtonixAuthenticationConstants) {
    AtonixAuthenticationConstants[AtonixAuthenticationConstants["LoginSuccessful"] = 0] = "LoginSuccessful";
    AtonixAuthenticationConstants[AtonixAuthenticationConstants["MFARequired"] = 1] = "MFARequired";
    AtonixAuthenticationConstants[AtonixAuthenticationConstants["TotpRequired"] = 2] = "TotpRequired";
    AtonixAuthenticationConstants[AtonixAuthenticationConstants["PasswordChangeRequired"] = 3] = "PasswordChangeRequired";
    AtonixAuthenticationConstants[AtonixAuthenticationConstants["LoginFailed"] = 4] = "LoginFailed";
    AtonixAuthenticationConstants[AtonixAuthenticationConstants["ChangeSuccessful"] = 5] = "ChangeSuccessful";
    AtonixAuthenticationConstants[AtonixAuthenticationConstants["VerificationCodeRequired"] = 6] = "VerificationCodeRequired";
    AtonixAuthenticationConstants[AtonixAuthenticationConstants["InitialPasswordRequired"] = 7] = "InitialPasswordRequired";
    AtonixAuthenticationConstants[AtonixAuthenticationConstants["NotImplemented"] = 8] = "NotImplemented";
})(AtonixAuthenticationConstants || (AtonixAuthenticationConstants = {}));
var AuthService = /** @class */ (function () {
    function AuthService(http, facade, inactivityService, dialog, router) {
        var _this = this;
        this.http = http;
        this.facade = facade;
        this.inactivityService = inactivityService;
        this.dialog = dialog;
        this.router = router;
        this.initialize();
        this.inactivityService.stopCountdownModal.subscribe(function () {
            _this.modalCountdown.close();
        });
        this.inactivityService.logoutUser.subscribe(function () {
            _this.facade.logout();
        });
        this.inactivityService.startCountdownModal.subscribe(function () {
            _this.modalCountdown = _this.dialog.open(ModalCountdownComponent, {
                data: { countdown: _this.inactivityService.countDownTimerValue },
                panelClass: 'countdown'
            });
        });
    }
    AuthService.prototype.initialize = function () {
        if (!this.populateUser(false)) {
            this.populateUser(true);
        }
    };
    AuthService.prototype.populateUser = function (useSession) {
        var _this = this;
        if (useSession === void 0) { useSession = false; }
        var result = false;
        var poolData = {
            UserPoolId: this.UserPoolID(),
            ClientId: this.ClientID()
        };
        // If the user has unchecked remember me this should use session storage instead of local storage.
        if (useSession) {
            poolData.Storage = window.sessionStorage;
        }
        this.userpool = new cognito.CognitoUserPool(poolData);
        this.user = this.userpool.getCurrentUser();
        if (this.user && this.user.getSession) {
            result = true;
            this.session = this.user.getSession(function (err, s) {
                if (!err) {
                    _this.session = s;
                    _this.attributes = null;
                }
            });
            this.facade.initialAuthAction(true);
        }
        return result;
    };
    AuthService.prototype.UserPoolID = function (newVal) {
        if (!_.isUndefined(newVal)) {
            window.localStorage.setItem('Cognito_UserPoolID', newVal);
        }
        return window.localStorage.getItem('Cognito_UserPoolID') || environment.cognitoUserPoolID;
    };
    AuthService.prototype.ClientID = function (newVal) {
        if (!_.isUndefined(newVal)) {
            window.localStorage.setItem('Cognito_ClientID', newVal);
        }
        return window.localStorage.getItem('Cognito_ClientID') || environment.cognitoClientId;
    };
    AuthService.prototype.getAttribute = function (attributeName) {
        var _this = this;
        return Observable.create(function (observer) {
            if (_this.attributes) {
                var value = '';
                for (var _i = 0, _a = _this.attributes; _i < _a.length; _i++) {
                    var a = _a[_i];
                    if (a.getName() === attributeName) {
                        value = a.getValue();
                        break;
                    }
                }
                observer.next(value);
            }
            else {
                _this.user.getUserAttributes(function (err, result) {
                    if (err) {
                        observer.error(err);
                    }
                    else {
                        var value = '';
                        _this.attributes = result;
                        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                            var a = result_1[_i];
                            if (a.getName() === attributeName) {
                                value = a.getValue();
                                break;
                            }
                        }
                        observer.next(value);
                    }
                });
            }
        });
    };
    AuthService.prototype.FriendlyName = function () {
        return this.getAttribute('name');
    };
    AuthService.prototype.Email = function () {
        return this.getAttribute('email');
    };
    AuthService.prototype.PhoneNumber = function () {
        return this.getAttribute('phone_number');
    };
    AuthService.prototype.PhoneNumberVerified = function () {
        return this.getAttribute('phone_number_verified').pipe(map(function (n) { return n === 'true'; }));
    };
    AuthService.prototype.SetPhoneNumber = function (phoneNumber) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.attributes = null;
            var attributeList = [];
            var attribute = new cognito.CognitoUserAttribute({
                Name: 'phone_number',
                Value: phoneNumber
            });
            attributeList.push(attribute);
            _this.user.updateAttributes(attributeList, function (err, result) {
                if (err) {
                    observer.error(err);
                }
                else {
                    _this.user.getAttributeVerificationCode('phone_number', {
                        onSuccess: function () {
                            observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
                        },
                        onFailure: function (err2) {
                            observer.error(err2);
                        },
                        inputVerificationCode: function () {
                            observer.next(AtonixAuthenticationConstants.VerificationCodeRequired);
                        }
                    });
                }
            });
        });
    };
    AuthService.prototype.ResendPhoneVerificationCode = function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.user.getAttributeVerificationCode('phone_number', {
                onSuccess: function () {
                    observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
                },
                onFailure: function (err2) {
                    observer.error(err2);
                },
                inputVerificationCode: function () {
                    observer.next(AtonixAuthenticationConstants.VerificationCodeRequired);
                }
            });
        });
    };
    AuthService.prototype.VerifyPhone = function (code) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.user.verifyAttribute('phone_number', code, {
                onSuccess: function () {
                    observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
                },
                onFailure: function (err) {
                    observer.error(err);
                }
            });
        });
    };
    AuthService.prototype.IsLoggedIn = function () {
        return this.user ? true : false;
    };
    AuthService.prototype.IsLoggedIn$ = function () {
        var _this = this;
        return Observable.create(function (observer) {
            if (_this.user) {
                observer.next(true);
            }
            else {
                observer.next(false);
            }
        });
    };
    AuthService.prototype.GetToken = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        return Observable.create(function (observer) {
            _this.attributes = null;
            if (_this.session && !force) {
                if (_this.session.isValid()) {
                    var t = _this.session.getIdToken().getJwtToken();
                    observer.next(t);
                }
                else {
                    _this.user.refreshSession(_this.session.getRefreshToken(), function (err, session) {
                        if (err) {
                            observer.error('Could not refresh user.');
                        }
                        else {
                            _this.session = session;
                            var t = _this.session.getIdToken().getJwtToken();
                            observer.next(t);
                        }
                    });
                }
            }
            else if (_this.user) {
                _this.user.getSession(function (err, session) {
                    if (err) {
                        observer.error('Could not get user.');
                    }
                    else {
                        _this.session = session;
                        observer.next(_this.session.getIdToken().getJwtToken());
                    }
                });
            }
            else {
                observer.error('Not Logged In');
            }
        });
    };
    AuthService.prototype.SignUp = function (email, name, phoneNumber, password) {
        var _this = this;
        return Observable.create(function (observer) {
            email = email.toLowerCase();
            _this.attributes = null;
            var attributeList = [];
            var dataEmail = {
                Name: 'email',
                Value: email
            };
            var dataPhoneNumber = {
                Name: 'phone_number',
                Value: phoneNumber
            };
            var dataName = {
                Name: 'name',
                Value: name
            };
            var attributeEmail = new cognito.CognitoUserAttribute(dataEmail);
            var attributePhoneNumber = new cognito.CognitoUserAttribute(dataPhoneNumber);
            var attributeName = new cognito.CognitoUserAttribute(dataName);
            attributeList.push(attributeEmail);
            attributeList.push(attributePhoneNumber);
            attributeList.push(attributeName);
            _this.userpool.signUp(email, password, attributeList, null, function (err, result) {
                if (err) {
                    observer.error(err);
                }
                else {
                    _this.user = result.user;
                    observer.next(result);
                }
            });
        });
    };
    AuthService.prototype.ConfirmUser = function (key) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.attributes = null;
            if (_this.user) {
                _this.user.confirmRegistration(key, true, function (err, result) {
                    if (err) {
                        observer.error(err);
                    }
                    else {
                        observer.next(true);
                    }
                });
            }
            else {
                observer.error({ message: 'No User' });
            }
        });
    };
    AuthService.prototype.CreateUser = function (email, rememberMe) {
        if (rememberMe === void 0) { rememberMe = true; }
        email = email.toLowerCase();
        var userData = {
            Username: email,
            Pool: this.userpool
        };
        if (!rememberMe) {
            userData.Storage = window.sessionStorage;
        }
        window.localStorage.setItem('user', JSON.stringify({ Email: email }));
        return new cognito.CognitoUser(userData);
    };
    AuthService.prototype.ConfigureMFAWithSMS = function () {
        var _this = this;
        return Observable.create(function (observer) {
            var totpMfaSettings = null;
            var smsMfaSettings = {
                PreferredMfa: true,
                Enabled: true
            };
            _this.user.enableMFA(function (err) {
                if (err) {
                    observer.error(err);
                }
                else {
                    _this.user.setUserMfaPreference(smsMfaSettings, totpMfaSettings, function (err2, result) {
                        if (err2) {
                            observer.error(err2);
                        }
                        else {
                            observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
                        }
                    });
                }
            });
        });
    };
    AuthService.prototype.ConfigureMFAWithTOTP = function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.user.associateSoftwareToken({
                associateSecretCode: function (secretCode) {
                    observer.next(secretCode);
                },
                onFailure: function (err3) {
                    observer.error(err3);
                }
            });
        });
    };
    AuthService.prototype.VerifyMFAWithTOTP = function (code) {
        var _this = this;
        return Observable.create(function (observer) {
            var totpMfaSettings = {
                PreferredMfa: true,
                Enabled: true
            };
            var smsMfaSettings = null;
            var deviceName = undefined;
            _this.user.verifySoftwareToken(code, deviceName, {
                onSuccess: function (session) {
                    _this.session = session;
                    _this.user.enableMFA(function (err, s) {
                        if (err) {
                            observer.error(err);
                        }
                        else {
                            _this.user.setUserMfaPreference(smsMfaSettings, totpMfaSettings, function (err2, result) {
                                if (err2) {
                                    observer.error(err2);
                                }
                                else {
                                    observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
                                }
                            });
                        }
                    });
                },
                onFailure: function (err) {
                    observer.error(err);
                }
            });
        });
    };
    AuthService.prototype.DisableMFA = function () {
        var _this = this;
        return Observable.create(function (observer) {
            var smsMfaSettings = {
                Enabled: false,
                PreferredMfa: false
            };
            var totpMfaSettings = {
                Enabled: false,
                PreferredMfa: false
            };
            // Annoyingly, if the user does not have one of these configured it will throw an error.
            // In that case I need to resend the request leaving out the appropriate value.
            _this.user.setUserMfaPreference(smsMfaSettings, totpMfaSettings, function (err, result) {
                if (err) {
                    if (err.name === 'InvalidParameterException') {
                        _this.user.setUserMfaPreference(smsMfaSettings, null, function (err2, result2) {
                            if (err2) {
                                console.error('Could not disable MFA.');
                                observer.error(err);
                            }
                            else {
                                observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
                            }
                        });
                    }
                }
                else {
                    observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
                }
            });
        });
    };
    AuthService.prototype.Login = function (email, password, rememberMe) {
        var _this = this;
        if (rememberMe === void 0) { rememberMe = true; }
        return Observable.create(function (observer) {
            email = email.toLowerCase();
            var authenticationData = {
                Username: email,
                Password: password
            };
            var authenticationDetails = new cognito.AuthenticationDetails(authenticationData);
            _this.user = _this.CreateUser(email, rememberMe);
            _this.user.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    _this.session = result;
                    observer.next({ Status: AtonixAuthenticationConstants.LoginSuccessful });
                },
                onFailure: function (err) {
                    if (err.code === 'PasswordResetRequiredException') {
                        observer.next({ Status: AtonixAuthenticationConstants.PasswordChangeRequired });
                    }
                    else {
                        observer.error(err);
                    }
                },
                mfaRequired: function (codeDeliveryDetails) {
                    observer.next({ Status: AtonixAuthenticationConstants.MFARequired });
                },
                totpRequired: function (challengeName, challengeParameters) {
                    observer.next({
                        Status: AtonixAuthenticationConstants.TotpRequired,
                        Challenge: challengeName,
                        ChallengeParameters: challengeParameters
                    });
                },
                newPasswordRequired: function (userAttributes, requiredAttributes) {
                    observer.next({
                        Status: AtonixAuthenticationConstants.InitialPasswordRequired,
                        UserAttributes: userAttributes,
                        RequiredAttributes: requiredAttributes
                    });
                }
            });
        });
    };
    AuthService.prototype.startTimeout = function (activityTimeInMinutes) {
        if (activityTimeInMinutes > 0) {
            this.inactivityService.initializeEventSources(activityTimeInMinutes * 60, 10);
            this.inactivityService.startInactivityTimer();
        }
    };
    AuthService.prototype.stopTimeout = function () {
        this.dialog.closeAll();
        this.inactivityService.stop();
    };
    AuthService.prototype.CompleteInitialPassword = function (newPassword, attributesData) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.user.completeNewPasswordChallenge(newPassword, attributesData, {
                onSuccess: function (session) {
                    _this.session = session;
                    observer.next({ Status: AtonixAuthenticationConstants.LoginSuccessful });
                },
                onFailure: function (err) {
                    if (err.code === 'PasswordResetRequiredException') {
                        observer.next({ Status: AtonixAuthenticationConstants.PasswordChangeRequired });
                    }
                    else {
                        observer.error(err);
                    }
                },
                mfaRequired: function (challengeName, challengeParameters) {
                    observer.next({
                        Status: AtonixAuthenticationConstants.MFARequired,
                        Challenge: challengeName,
                        ChallengeParameters: challengeParameters
                    });
                }
            });
        });
    };
    AuthService.prototype.LogOut = function () {
        if (this.user) {
            this.user.signOut();
            this.user = null;
        }
        this.session = null;
    };
    AuthService.prototype.FinishLoginSMS = function (code) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.user.sendMFACode(code, {
                onSuccess: function (result) {
                    _this.session = result;
                    observer.next(AtonixAuthenticationConstants.LoginSuccessful);
                },
                onFailure: function (err) {
                    observer.error(err);
                }
            }, 'SMS_MFA');
        });
    };
    AuthService.prototype.FinishLoginSoftwareToken = function (code) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.user.sendMFACode(code, {
                onSuccess: function (result) {
                    _this.session = result;
                    observer.next(AtonixAuthenticationConstants.LoginSuccessful);
                },
                onFailure: function (err) {
                    observer.error(err);
                }
            }, 'SOFTWARE_TOKEN_MFA');
        });
    };
    AuthService.prototype.ForgotPassword = function (email) {
        var _this = this;
        return Observable.create(function (observer) {
            email = email.toLowerCase();
            _this.user = _this.CreateUser(email);
            _this.user.forgotPassword({
                onSuccess: function (data) {
                    observer.next(data);
                },
                onFailure: function (err) {
                    observer.error(err);
                },
                inputVerificationCode: function (data) {
                    observer.next(data.CodeDeliveryDetails);
                }
            });
        });
    };
    AuthService.prototype.ChangePassword = function (oldPassword, newPassword) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.user.changePassword(oldPassword, newPassword, function (err, result) {
                if (err) {
                    console.error('Could not change password.');
                    observer.error(err);
                }
                else {
                    observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
                }
            });
        });
    };
    AuthService.prototype.ConfirmPassword = function (email, newPassword, verificationCode) {
        var _this = this;
        return Observable.create(function (observer) {
            email = email.toLowerCase();
            _this.user = _this.CreateUser(email);
            _this.user.confirmPassword(verificationCode, newPassword, {
                onSuccess: function () {
                    observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
                },
                onFailure: function (err) {
                    observer.error(err);
                }
            });
        });
    };
    AuthService.prototype.InitializeUser = function (email) {
        return this.http.get(environment.baseUrl + '/Services/api/Account/InitializeUser', {
            headers: { Anonymous: 'true' },
            params: { email: email.toLowerCase() }
        });
    };
    AuthService.prototype.TimeoutSetting = function () {
        return this.http.get(environment.baseUrl + '/Services/api/Authorization/TimeoutSetting');
    };
    AuthService.prototype.GetPoolInfo = function () {
        var _this = this;
        return this.http
            .get(environment.baseUrl + '/Services/api/Authorization/CognitoSettings', {
            headers: { Anonymous: 'true' }
        })
            .pipe(map(function (n) {
            return { pool: n.PoolID, client: n.ClientID };
        }), tap(function (n) {
            if (n.pool && n.client) {
                _this.ClientID(n.client);
                _this.UserPoolID(n.pool);
            }
        }));
    };
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            AuthFacade,
            InactivityService,
            MatDialog,
            Router])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map