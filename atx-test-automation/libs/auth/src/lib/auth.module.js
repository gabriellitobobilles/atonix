import * as tslib_1 from "tslib";
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
import { AuthConfigService } from './services/auth-config.service';
import { InitialStateService } from './services/initial-state.service';
import { InactivityService } from './services/inactivity.service';
import { InactivityLocalStorageService } from './services/inactivity-local-storage.service';
import { ModalCountdownComponent } from './components/modal-countdown/modal-countdown.component';
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule_1 = AuthModule;
    AuthModule.forRoot = function (config) {
        return {
            ngModule: AuthModule_1,
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
    };
    var AuthModule_1;
    AuthModule = AuthModule_1 = tslib_1.__decorate([
        NgModule({
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
    ], AuthModule);
    return AuthModule;
}());
export { AuthModule };
//# sourceMappingURL=auth.module.js.map