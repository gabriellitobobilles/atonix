import { Component, OnInit } from '@angular/core';
import { Authenticate } from '../models/authenticate';
import { PasswordChange } from '../models/password-change';
import { Observable } from 'rxjs';
import { AuthFacade } from '../state/auth/auth.facade';
import { IAccountSetup } from '../models/account-setup';

@Component({
  selector: 'atx-login-page',
  templateUrl: './login-page.component.html',
  styles: []
})
export class LoginPageComponent implements OnInit {
  authState$: Observable<string>;
  message$: Observable<string>;
  isSoftwareToken$: Observable<boolean>;
  error$: Observable<string>;
  email$: Observable<string>;
  name$: Observable<string>;

  constructor(private facade: AuthFacade) {}

  ngOnInit() {
    this.authState$ = this.facade.authState$;
    this.message$ = this.facade.message$;
    this.error$ = this.facade.errorMessage$;
    this.isSoftwareToken$ = this.facade.isSoftwareToken$;
    this.email$ = this.facade.email$;
    this.name$ = this.facade.name$;
    this.facade.getCognitoSettings();
    this.facade.loggedIn$.subscribe(n => {
      if (n) {
        this.facade.loginSuccessRedirect();
      }
    });
  }

  onLogin($event: Authenticate) {
    this.facade.login($event.username, $event.password, $event.rememberMe);
  }

  onMfa($event: string) {
    this.facade.sendMfa($event);
  }

  onForgotPassword($event: Authenticate) {
    this.facade.forgotPassword($event.username);
  }

  onRequestPassword($event: string) {
    this.facade.requestPassword($event);
  }

  onRequestPasswordCancelled() {
    this.facade.requestPasswordCancelled();
  }

  onShowCodeForm($event: Authenticate) {
    this.facade.requestPasswordComplete($event.username);
  }

  onChangePassword($event: PasswordChange) {
    this.facade.changePassword($event);
  }

  onChangePasswordCancelled() {
    this.facade.changePasswordCancelled();
  }

  onInitialPassword($event: IAccountSetup) {
    this.facade.initialPassword($event);
  }

  onInitialPasswordCancelled() {
    this.facade.initialPasswordCancelled();
  }
}
