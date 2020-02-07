import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './containers/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MfaFormComponent } from './components/mfa-form/mfa-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '@AtonixWebSites/material';
import { AuthFacade } from './state/auth/auth.facade';
import { reducers } from './state';
import { UserEffects } from './state/user/user.effects';
import { AuthEffects } from './state/auth/auth.effects';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { InitialPasswordComponent } from './components/initial-password/initial-password.component';
import { AuthConfig } from './models/auth-config';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AuthConfigService } from './services/auth-config.service';
import { InitialStateService } from './services/initial-state.service';
import { InactivityService } from './services/inactivity.service';
import { InactivityLocalStorageService } from './services/inactivity-local-storage.service';
import { ModalCountdownComponent } from './components/modal-countdown/modal-countdown.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([{ path: 'login', component: LoginPageComponent }]),
    StoreModule.forFeature('authUser', reducers),
    EffectsModule.forFeature([UserEffects, AuthEffects])
  ],
  entryComponents: [ModalCountdownComponent],
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    ModalCountdownComponent,
    MfaFormComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    InitialPasswordComponent
  ],
  providers: [],
  exports: [LoginPageComponent, LoginFormComponent, ModalCountdownComponent]
})
export class AuthModule {
  static forRoot(config: AuthConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthGuardService,
        AuthFacade,
        AuthService,
        InitialStateService,
        InactivityService,
        InactivityLocalStorageService,
        JwtInterceptorService,
        {
          provide: AuthConfigService,
          useValue: config
        }
      ]
    };
  }
}
