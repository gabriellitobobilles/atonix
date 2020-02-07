import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AssetTreeModule } from '@AtonixWebSites/asset-tree';
import { LayoutModule } from '@AtonixWebSites/layout';
import { WorkflowModule } from './workflow/workflow.module';
import { ToastrModule } from 'ngx-toastr';
import { ResizableModule } from 'angular-resizable-element';
import { AuthModule, JwtInterceptorService } from '@AtonixWebSites/auth';
import { NgrxRouterModule } from '@AtonixWebSites/ngrx-router';
import { NxModule } from '@nrwl/nx';
// import { MaterialLayoutModule } from '@AtonixWebSites/material-layout';
import { environment } from '@env/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { AppComponent } from './components/app/app.component';
import { ConfirmDeactivateGuard } from './workflow/services/confirm-deactivate-guard';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ResizableModule,
    NxModule.forRoot(),
    StoreModule.forRoot({}, { metaReducers: !environment.production ? [storeFreeze] : [] }),
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
    WorkflowModule.forRoot(),
    AuthModule.forRoot({ appContext: 51, permittedAppContexts: [51] }),
    AssetTreeModule,
    LayoutModule,
    NgrxRouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: JwtInterceptorService,
      multi: true
    },
    ConfirmDeactivateGuard
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent]
})
export class AppModule {}
