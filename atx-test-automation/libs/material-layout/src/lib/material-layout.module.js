import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@AtonixWebSites/material';
import { LayoutAppComponent } from './containers/app/app.component';
import { LayoutComponent } from './components/layout.component';
import { SidenavComponent } from './components/sidenav.component';
import { ToolbarComponent } from './components/toolbar.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/layout.reducer';
import { LayoutFacade } from './state/layout.facade';
import { AuthModule, UserFacade } from '@AtonixWebSites/auth';
var MaterialLayoutModule = /** @class */ (function () {
    function MaterialLayoutModule() {
    }
    MaterialLayoutModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, ResizableModule, AuthModule, RouterModule, MaterialModule, StoreModule.forFeature('layout', reducer)],
            declarations: [LayoutAppComponent, LayoutComponent, SidenavComponent, ToolbarComponent],
            providers: [LayoutFacade, UserFacade],
            exports: [LayoutAppComponent, LayoutComponent, SidenavComponent, ToolbarComponent]
        })
    ], MaterialLayoutModule);
    return MaterialLayoutModule;
}());
export { MaterialLayoutModule };
//# sourceMappingURL=material-layout.module.js.map