import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as cognito from 'amazon-cognito-identity-js';
import { environment } from '@env/environment';
import { AuthFacade } from '../state/auth/auth.facade';
import * as _ from 'lodash';
import { InactivityService } from './inactivity.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalCountdownComponent } from '../components/modal-countdown/modal-countdown.component';
import { Router } from '@angular/router';

export enum AtonixAuthenticationConstants {
  LoginSuccessful,
  MFARequired,
  TotpRequired,
  PasswordChangeRequired,
  LoginFailed,
  ChangeSuccessful,
  VerificationCodeRequired,
  InitialPasswordRequired,
  NotImplemented
}

export interface ILoginResult {
  Status: AtonixAuthenticationConstants;
  Challenge?: string;
  ChallengeParameters?: string;
  UserAttributes?: any;
  RequiredAttributes?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userpool: cognito.CognitoUserPool;
  private user: cognito.CognitoUser;
  private session: cognito.CognitoUserSession;
  private attributes: cognito.CognitoUserAttribute[];
  private modalCountdown: MatDialogRef<ModalCountdownComponent, any>;
  constructor(
    private http: HttpClient,
    private facade: AuthFacade,
    private inactivityService: InactivityService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.initialize();
    this.inactivityService.stopCountdownModal.subscribe(() => {
      this.modalCountdown.close();
    });
    this.inactivityService.logoutUser.subscribe(() => {
      this.facade.logout();
    });
    this.inactivityService.startCountdownModal.subscribe(() => {
      this.modalCountdown = this.dialog.open(ModalCountdownComponent, {
        data: { countdown: this.inactivityService.countDownTimerValue },
        panelClass: 'countdown'
      });
    });
  }

  private initialize() {
    if (!this.populateUser(false)) {
      this.populateUser(true);
    }
  }

  private populateUser(useSession: boolean = false) {
    let result = false;

    const poolData: cognito.ICognitoUserPoolData = {
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
      this.session = this.user.getSession((err, s) => {
        if (!err) {
          this.session = s;
          this.attributes = null;
        }
      });
      this.facade.initialAuthAction(true);
    }
    return result;
  }

  public UserPoolID(newVal?: string) {
    if (!_.isUndefined(newVal)) {
      window.localStorage.setItem('Cognito_UserPoolID', newVal);
    }
    return window.localStorage.getItem('Cognito_UserPoolID') || environment.cognitoUserPoolID;
  }

  public ClientID(newVal?: string) {
    if (!_.isUndefined(newVal)) {
      window.localStorage.setItem('Cognito_ClientID', newVal);
    }
    return window.localStorage.getItem('Cognito_ClientID') || environment.cognitoClientId;
  }

  private getAttribute(attributeName): Observable<string> {
    return Observable.create(observer => {
      if (this.attributes) {
        let value = '';
        for (const a of this.attributes) {
          if (a.getName() === attributeName) {
            value = a.getValue();
            break;
          }
        }
        observer.next(value);
      } else {
        this.user.getUserAttributes((err, result) => {
          if (err) {
            observer.error(err);
          } else {
            let value = '';
            this.attributes = result;
            for (const a of result) {
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
  }

  public FriendlyName() {
    return this.getAttribute('name');
  }

  public Email() {
    return this.getAttribute('email');
  }

  public PhoneNumber() {
    return this.getAttribute('phone_number');
  }

  public PhoneNumberVerified() {
    return this.getAttribute('phone_number_verified').pipe(map(n => n === 'true'));
  }

  public SetPhoneNumber(phoneNumber: string): Observable<AtonixAuthenticationConstants> {
    return Observable.create(observer => {
      this.attributes = null;
      const attributeList = [];
      const attribute = new cognito.CognitoUserAttribute({
        Name: 'phone_number',
        Value: phoneNumber
      });
      attributeList.push(attribute);
      this.user.updateAttributes(attributeList, (err, result) => {
        if (err) {
          observer.error(err);
        } else {
          this.user.getAttributeVerificationCode('phone_number', {
            onSuccess: () => {
              observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
            },
            onFailure: err2 => {
              observer.error(err2);
            },
            inputVerificationCode: () => {
              observer.next(AtonixAuthenticationConstants.VerificationCodeRequired);
            }
          });
        }
      });
    });
  }

  public ResendPhoneVerificationCode(): Observable<AtonixAuthenticationConstants> {
    return Observable.create(observer => {
      this.user.getAttributeVerificationCode('phone_number', {
        onSuccess: () => {
          observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
        },
        onFailure: err2 => {
          observer.error(err2);
        },
        inputVerificationCode: () => {
          observer.next(AtonixAuthenticationConstants.VerificationCodeRequired);
        }
      });
    });
  }

  public VerifyPhone(code: string): Observable<AtonixAuthenticationConstants> {
    return Observable.create(observer => {
      this.user.verifyAttribute('phone_number', code, {
        onSuccess: () => {
          observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
        },
        onFailure: err => {
          observer.error(err);
        }
      });
    });
  }

  public IsLoggedIn() {
    return this.user ? true : false;
  }

  public IsLoggedIn$() {
    return Observable.create(observer => {
      if (this.user) {
        observer.next(true);
      } else {
        observer.next(false);
      }
    });
  }

  public GetToken(force: boolean = false): Observable<string> {
    return Observable.create(observer => {
      this.attributes = null;
      if (this.session && !force) {
        if (this.session.isValid()) {
          const t = this.session.getIdToken().getJwtToken();
          observer.next(t);
        } else {
          this.user.refreshSession(this.session.getRefreshToken(), (err, session) => {
            if (err) {
              observer.error('Could not refresh user.');
            } else {
              this.session = session;
              const t = this.session.getIdToken().getJwtToken();
              observer.next(t);
            }
          });
        }
      } else if (this.user) {
        this.user.getSession((err, session) => {
          if (err) {
            observer.error('Could not get user.');
          } else {
            this.session = session;
            observer.next(this.session.getIdToken().getJwtToken());
          }
        });
      } else {
        observer.error('Not Logged In');
      }
    });
  }

  public SignUp(email: string, name: string, phoneNumber: string, password: string): Observable<cognito.ISignUpResult> {
    return Observable.create(observer => {
      email = email.toLowerCase();

      this.attributes = null;
      const attributeList = [];
      const dataEmail: cognito.ICognitoUserAttributeData = {
        Name: 'email',
        Value: email
      };
      const dataPhoneNumber: cognito.ICognitoUserAttributeData = {
        Name: 'phone_number',
        Value: phoneNumber
      };
      const dataName: cognito.ICognitoUserAttributeData = {
        Name: 'name',
        Value: name
      };

      const attributeEmail = new cognito.CognitoUserAttribute(dataEmail);
      const attributePhoneNumber = new cognito.CognitoUserAttribute(dataPhoneNumber);
      const attributeName = new cognito.CognitoUserAttribute(dataName);
      attributeList.push(attributeEmail);
      attributeList.push(attributePhoneNumber);
      attributeList.push(attributeName);

      this.userpool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          observer.error(err);
        } else {
          this.user = result.user;
          observer.next(result);
        }
      });
    });
  }

  public ConfirmUser(key: string): Observable<boolean> {
    return Observable.create(observer => {
      this.attributes = null;
      if (this.user) {
        this.user.confirmRegistration(key, true, (err, result) => {
          if (err) {
            observer.error(err);
          } else {
            observer.next(true);
          }
        });
      } else {
        observer.error({ message: 'No User' });
      }
    });
  }

  private CreateUser(email: string, rememberMe: boolean = true) {
    email = email.toLowerCase();

    const userData: cognito.ICognitoUserData = {
      Username: email,
      Pool: this.userpool
    };

    if (!rememberMe) {
      userData.Storage = window.sessionStorage;
    }

    window.localStorage.setItem('user', JSON.stringify({ Email: email }));

    return new cognito.CognitoUser(userData);
  }

  public ConfigureMFAWithSMS(): Observable<AtonixAuthenticationConstants> {
    return Observable.create(observer => {
      const totpMfaSettings = null;
      const smsMfaSettings = {
        PreferredMfa: true,
        Enabled: true
      };

      this.user.enableMFA(err => {
        if (err) {
          observer.error(err);
        } else {
          (this.user as any).setUserMfaPreference(smsMfaSettings, totpMfaSettings, (err2, result) => {
            if (err2) {
              observer.error(err2);
            } else {
              observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
            }
          });
        }
      });
    });
  }

  public ConfigureMFAWithTOTP(): Observable<string> {
    return Observable.create(observer => {
      this.user.associateSoftwareToken({
        associateSecretCode: (secretCode: string) => {
          observer.next(secretCode);
        },
        onFailure: (err3: any) => {
          observer.error(err3);
        }
      });
    });
  }

  public VerifyMFAWithTOTP(code: string): Observable<AtonixAuthenticationConstants> {
    return Observable.create(observer => {
      const totpMfaSettings = {
        PreferredMfa: true,
        Enabled: true
      };
      const smsMfaSettings = null;

      const deviceName: string = undefined;

      this.user.verifySoftwareToken(code, deviceName, {
        onSuccess: session => {
          this.session = session;
          this.user.enableMFA((err, s) => {
            if (err) {
              observer.error(err);
            } else {
              (this.user as any).setUserMfaPreference(smsMfaSettings, totpMfaSettings, (err2, result) => {
                if (err2) {
                  observer.error(err2);
                } else {
                  observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
                }
              });
            }
          });
        },
        onFailure: err => {
          observer.error(err);
        }
      });
    });
  }

  public DisableMFA(): Observable<AtonixAuthenticationConstants> {
    return Observable.create(observer => {
      const smsMfaSettings = {
        Enabled: false,
        PreferredMfa: false
      };
      const totpMfaSettings = {
        Enabled: false,
        PreferredMfa: false
      };

      // Annoyingly, if the user does not have one of these configured it will throw an error.
      // In that case I need to resend the request leaving out the appropriate value.
      this.user.setUserMfaPreference(
        smsMfaSettings,
        totpMfaSettings,
        (err: { code: string; message: string; name: string }, result) => {
          if (err) {
            if (err.name === 'InvalidParameterException') {
              this.user.setUserMfaPreference(
                smsMfaSettings,
                null,
                (err2: { code: string; message: string; name: string }, result2) => {
                  if (err2) {
                    console.error('Could not disable MFA.');
                    observer.error(err);
                  } else {
                    observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
                  }
                }
              );
            }
          } else {
            observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
          }
        }
      );
    });
  }

  public Login(email: string, password: string, rememberMe: boolean = true): Observable<ILoginResult> {
    return Observable.create(observer => {
      email = email.toLowerCase();

      const authenticationData: cognito.IAuthenticationDetailsData = {
        Username: email,
        Password: password
      };

      const authenticationDetails = new cognito.AuthenticationDetails(authenticationData);

      this.user = this.CreateUser(email, rememberMe);

      this.user.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          this.session = result;
          observer.next({ Status: AtonixAuthenticationConstants.LoginSuccessful });
        },
        onFailure: err => {
          if (err.code === 'PasswordResetRequiredException') {
            observer.next({ Status: AtonixAuthenticationConstants.PasswordChangeRequired });
          } else {
            observer.error(err);
          }
        },
        mfaRequired: codeDeliveryDetails => {
          observer.next({ Status: AtonixAuthenticationConstants.MFARequired });
        },
        totpRequired: (challengeName: any, challengeParameters: any) => {
          observer.next({
            Status: AtonixAuthenticationConstants.TotpRequired,
            Challenge: challengeName,
            ChallengeParameters: challengeParameters
          });
        },
        newPasswordRequired: (userAttributes: any, requiredAttributes: any) => {
          observer.next({
            Status: AtonixAuthenticationConstants.InitialPasswordRequired,
            UserAttributes: userAttributes,
            RequiredAttributes: requiredAttributes
          });
        }
      });
    });
  }

  startTimeout(activityTimeInMinutes: number) {
    if (activityTimeInMinutes > 0) {
      this.inactivityService.initializeEventSources(activityTimeInMinutes * 60, 10);
      this.inactivityService.startInactivityTimer();
    }
  }

  stopTimeout() {
    this.dialog.closeAll();
    this.inactivityService.stop();
  }

  public CompleteInitialPassword(newPassword: string, attributesData: { name: string }): Observable<ILoginResult> {
    return Observable.create(observer => {
      this.user.completeNewPasswordChallenge(newPassword, attributesData, {
        onSuccess: (session: cognito.CognitoUserSession) => {
          this.session = session;
          observer.next({ Status: AtonixAuthenticationConstants.LoginSuccessful });
        },
        onFailure: err => {
          if (err.code === 'PasswordResetRequiredException') {
            observer.next({ Status: AtonixAuthenticationConstants.PasswordChangeRequired });
          } else {
            observer.error(err);
          }
        },
        mfaRequired: (challengeName: string, challengeParameters: any) => {
          observer.next({
            Status: AtonixAuthenticationConstants.MFARequired,
            Challenge: challengeName,
            ChallengeParameters: challengeParameters
          });
        }
      });
    });
  }

  public LogOut() {
    if (this.user) {
      this.user.signOut();
      this.user = null;
    }
    this.session = null;
  }

  public FinishLoginSMS(code: string): Observable<AtonixAuthenticationConstants> {
    return Observable.create(observer => {
      this.user.sendMFACode(
        code,
        {
          onSuccess: result => {
            this.session = result;
            observer.next(AtonixAuthenticationConstants.LoginSuccessful);
          },
          onFailure: err => {
            observer.error(err);
          }
        },
        'SMS_MFA'
      );
    });
  }

  public FinishLoginSoftwareToken(code: string): Observable<AtonixAuthenticationConstants> {
    return Observable.create(observer => {
      this.user.sendMFACode(
        code,
        {
          onSuccess: result => {
            this.session = result;
            observer.next(AtonixAuthenticationConstants.LoginSuccessful);
          },
          onFailure: err => {
            observer.error(err);
          }
        },
        'SOFTWARE_TOKEN_MFA'
      );
    });
  }

  public ForgotPassword(email: string): Observable<{ AttributeName: string; DeliveryMedium: string; Destination: string }> {
    return Observable.create(observer => {
      email = email.toLowerCase();

      this.user = this.CreateUser(email);

      this.user.forgotPassword({
        onSuccess: (data: any) => {
          observer.next(data);
        },
        onFailure: (err: { code: string; message: string; name: string }) => {
          observer.error(err);
        },
        inputVerificationCode: (data: {
          CodeDeliveryDetails: { AttributeName: string; DeliveryMedium: string; Destination: string };
        }) => {
          observer.next(data.CodeDeliveryDetails);
        }
      });
    });
  }

  public ChangePassword(oldPassword: string, newPassword: string): Observable<AtonixAuthenticationConstants> {
    return Observable.create(observer => {
      this.user.changePassword(oldPassword, newPassword, (err, result) => {
        if (err) {
          console.error('Could not change password.');
          observer.error(err);
        } else {
          observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
        }
      });
    });
  }

  public ConfirmPassword(
    email: string,
    newPassword: string,
    verificationCode: string
  ): Observable<AtonixAuthenticationConstants> {
    return Observable.create(observer => {
      email = email.toLowerCase();

      this.user = this.CreateUser(email);

      this.user.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => {
          observer.next(AtonixAuthenticationConstants.ChangeSuccessful);
        },
        onFailure: err => {
          observer.error(err);
        }
      });
    });
  }

  public InitializeUser(email: string) {
    return this.http.get(environment.baseUrl + '/Services/api/Account/InitializeUser', {
      headers: { Anonymous: 'true' },
      params: { email: email.toLowerCase() }
    });
  }

  public TimeoutSetting(): Observable<number> {
    return this.http.get<number>(environment.baseUrl + '/Services/api/Authorization/TimeoutSetting');
  }

  public GetPoolInfo() {
    return this.http
      .get(environment.baseUrl + '/Services/api/Authorization/CognitoSettings', {
        headers: { Anonymous: 'true' }
      })
      .pipe(
        map((n: any) => {
          return { pool: n.PoolID, client: n.ClientID };
        }),
        tap(n => {
          if (n.pool && n.client) {
            this.ClientID(n.client);
            this.UserPoolID(n.pool);
          }
        })
      );
  }

  //
  // authenticate(credentials: Authenticate): Observable<AppUserAuth> {
  //   return Observable.create(observer => {
  //     const email = credentials.username.toLowerCase();

  //     const authenticationData: cognito.IAuthenticationDetailsData = {
  //       Username: email,
  //       Password: credentials.password
  //     };

  //     const authenticationDetails = new cognito.AuthenticationDetails(authenticationData);

  //     this.user = this.CreateUser(email, true);

  //     this.user.authenticateUser(authenticationDetails, {
  //       onSuccess: result => {
  //         this.session = result;
  //         this.refreshToken();

  //         const autResult: AppUserAuth = {
  //           loggedIn: true,
  //           tokenRequired: false,
  //           passwordResetRequired: false,
  //           totpRequired: false,
  //           userName: 'AAA',
  //           access_token: this.getAuthToken(),
  //           expires_in: null,
  //           token_type: 'access',
  //           claims: null,
  //           challengeName: null,
  //           challengeParameters: null
  //         };
  //         observer.next(autResult);
  //       },
  //       onFailure: err => {
  //         if (err.code === 'PasswordResetRequiredException') {
  //           const autResult: AppUserAuth = {
  //             loggedIn: false,
  //             tokenRequired: false,
  //             passwordResetRequired: true,
  //             totpRequired: false,
  //             userName: 'AAA',
  //             access_token: this.getAuthToken(),
  //             expires_in: null,
  //             token_type: 'access',
  //             claims: null,
  //             challengeName: null,
  //             challengeParameters: null
  //           };
  //           observer.next(autResult);
  //         } else {
  //           observer.error(err);
  //         }
  //       },
  //       mfaRequired: codeDeliveryDetails => {
  //         const autResult: AppUserAuth = {
  //           loggedIn: false,
  //           tokenRequired: true,
  //           passwordResetRequired: false,
  //           totpRequired: false,
  //           userName: null,
  //           access_token: null,
  //           expires_in: null,
  //           token_type: null,
  //           claims: null,
  //           challengeName: null,
  //           challengeParameters: null
  //         };
  //         observer.next(autResult);
  //       },
  //       totpRequired: (challengeName: any, challengeParameters: any) => {
  //         const autResult: AppUserAuth = {
  //           loggedIn: false,
  //           tokenRequired: false,
  //           passwordResetRequired: false,
  //           totpRequired: true,
  //           userName: 'AAA',
  //           access_token: this.getAuthToken(),
  //           expires_in: null,
  //           token_type: 'access',
  //           claims: null,
  //           // tslint:disable-next-line:object-literal-shorthand
  //           challengeName: challengeName,
  //           challengeParameters
  //         };
  //         observer.next(autResult);
  //       },
  //       newPasswordRequired: (userAttributes: any, requiredAttributes: any) => {
  //         const autResult: AppUserAuth = {
  //           loggedIn: false,
  //           tokenRequired: false,
  //           passwordResetRequired: true,
  //           totpRequired: false,
  //           userName: null,
  //           access_token: null,
  //           expires_in: null,
  //           token_type: null,
  //           claims: null,
  //           challengeName: null,
  //           challengeParameters: null
  //         };
  //         observer.next(autResult);
  //       }
  //     });
  //   });
  // }

  // sendMfaCode(code: string): Observable<AppUserAuth> {
  //   return Observable.create(observer => {
  //     this.user.sendMFACode(
  //       code,
  //       {
  //         onSuccess: result => {
  //           this.session = result;
  //           this.refreshToken();

  //           const autResult: AppUserAuth = {
  //             loggedIn: true,
  //             tokenRequired: false,
  //             passwordResetRequired: false,
  //             totpRequired: false,
  //             userName: 'AAA',
  //             access_token: this.getAuthToken(),
  //             expires_in: null,
  //             token_type: 'access',
  //             claims: null,
  //             challengeName: null,
  //             challengeParameters: null
  //           };
  //           observer.next(autResult);
  //         },
  //         onFailure: err => {
  //           observer.error(err);
  //         }
  //       },
  //       'SMS_MFA'
  //     );
  //   });
  // }

  // isAuthenticated(): boolean {
  //   let result = false;
  //   if (this.user) {
  //     result = true;
  //   }
  //   return result;
  // }

  // logoutUser() {
  //   if (this.user) {
  //     this.user.signOut();
  //   }
  // }

  // getAuthToken(): string {
  //   return this.token;
  // }

  // refreshToken(): Observable<string> {
  //   console.log('Refreshing the token');
  //   const result: Observable<string> = new Observable<string>(observer => {
  //     if (this.user && this.session) {
  //       this.user.refreshSession(this.session.getRefreshToken(), (err, session) => {
  //         if (err) {
  //           observer.error('Could not refresh token');
  //         } else {
  //           this.session = session;
  //           const t = this.session.getIdToken().getJwtToken();
  //           this.token = t;
  //           observer.next(t);
  //         }
  //       });
  //     } else if (this.user) {
  //       this.user.getSession((err, session) => {
  //         if (err) {
  //           observer.error('Could not get user');
  //           this.user = null;
  //         } else {
  //           this.session = session;
  //           const t = this.session.getIdToken().getJwtToken();
  //           this.token = t;
  //           observer.next(t);
  //         }
  //       });
  //     } else {
  //       observer.error('Not Logged In');
  //     }
  //   }).pipe(take(1));

  //   // result.pipe(switchMap(t => (this.token = t)));

  //   return result;
  // }
}
