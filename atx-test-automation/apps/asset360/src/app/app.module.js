import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';
import { ResizableModule } from 'angular-resizable-element';
import { environment } from '@env/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { NxModule } from '@nrwl/nx';
import { Asset360AppComponent } from './asset360-app/asset360-app.component';
import { LayoutModule } from '@AtonixWebSites/layout';
import { AuthModule, JwtInterceptorService, clearAllState } from '@AtonixWebSites/auth';
import { NgrxRouterModule } from '@AtonixWebSites/ngrx-router';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import { AssetTreeModule } from '@AtonixWebSites/asset-tree';
import { TimeRangeSelectorModule } from '@AtonixWebSites/time-range-selector';
import { AssetInfoTrayModule } from '@AtonixWebSites/asset-info-tray';
import { ViewsModule } from './views/views.module';
import { MaterialModule } from '@AtonixWebSites/material';
import { NotFoundComponent } from './views/containers/tabs/not-found/not-found.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [Asset360AppComponent, UserComponent, NotFoundComponent],
            imports: [
                CommonModule,
                BrowserModule,
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientModule,
                ViewsModule,
                AssetTreeModule,
                TimeRangeSelectorModule,
                AssetInfoTrayModule.forRoot(),
                ResizableModule,
                NxModule.forRoot(),
                StoreModule.forRoot({}, { metaReducers: !environment.production ? [storeFreeze, clearAllState] : [clearAllState] }),
                AppRoutingModule,
                StoreRouterConnectingModule.forRoot(),
                StoreDevtoolsModule.instrument({
                    name: 'Atonix DevTools',
                    logOnly: environment.production
                }),
                ToastrModule.forRoot({
                    timeOut: 8000,
                    positionClass: 'toast-bottom-right',
                    closeButton: true,
                    preventDuplicates: true
                }),
                EffectsModule.forRoot([]),
                AuthModule.forRoot({
                    appContext: 1,
                    permittedAppContexts: [1, 2, 3, 4, 5, 6, 7, 9, 14, 15, 18, 23, 24, 31, 32, 33, 35, 38, 40, 44, 47, 48, 49]
                }),
                NgrxRouterModule,
                LayoutModule
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useExisting: JwtInterceptorService,
                    multi: true
                }
            ],
            bootstrap: [Asset360AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map