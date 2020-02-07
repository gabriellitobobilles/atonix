import * as tslib_1 from "tslib";
import { Component, ChangeDetectorRef, HostListener, ViewEncapsulation } from '@angular/core';
import { AuthFacade } from '@AtonixWebSites/auth';
import { ThemeService } from '@AtonixWebSites/material';
import { LayoutFacade } from '../../state/layout.facade';
import * as _ from 'lodash';
var LayoutAppComponent = /** @class */ (function () {
    function LayoutAppComponent(layoutFacade, changeDetector, themeService, authFacade) {
        this.layoutFacade = layoutFacade;
        this.changeDetector = changeDetector;
        this.themeService = themeService;
        this.authFacade = authFacade;
        this.componentActive = true;
    }
    LayoutAppComponent.prototype.ngOnInit = function () {
        this.innerWidth = window.innerWidth;
        this.loggedIn$ = this.authFacade.loggedIn$;
        this.user$ = this.authFacade.authUser$;
        this.showSidenav$ = this.layoutFacade.showSideNav$;
        this.sidenavWidth$ = this.layoutFacade.sidenavWidth$;
        this.useLightTheme$ = this.themeService.useLightTheme;
    };
    LayoutAppComponent.prototype.resizeSideNav = function ($event) {
        if (!_.isNil($event.resizeWidth)) {
            this.layoutFacade.setSideNavWidth($event.resizeWidth);
        }
    };
    LayoutAppComponent.prototype.ngDoCheck = function () {
        this.changeDetector.detectChanges();
    };
    LayoutAppComponent.prototype.resetLayout = function () {
        if (this.innerWidth >= 700) {
            this.layoutFacade.openSidenav();
        }
    };
    LayoutAppComponent.prototype.toggleAssetNavigator = function () {
        this.layoutFacade.toggleAssetNavigator();
    };
    LayoutAppComponent.prototype.closeSidenav = function () {
        this.layoutFacade.closeSideNav();
    };
    LayoutAppComponent.prototype.openSidenav = function () {
        this.layoutFacade.openSidenav();
    };
    LayoutAppComponent.prototype.logout = function () {
        this.authFacade.logout();
        this.layoutFacade.closeSideNav();
    };
    LayoutAppComponent.prototype.onResize = function (event) {
        this.innerWidth = event.target.innerWidth;
        if (event.target.innerWidth < 700) {
            this.layoutFacade.closeSideNav();
        }
    };
    tslib_1.__decorate([
        HostListener('window:resize', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], LayoutAppComponent.prototype, "onResize", null);
    LayoutAppComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-layout-app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss'],
            encapsulation: ViewEncapsulation.None
        }),
        tslib_1.__metadata("design:paramtypes", [LayoutFacade,
            ChangeDetectorRef,
            ThemeService,
            AuthFacade])
    ], LayoutAppComponent);
    return LayoutAppComponent;
}());
export { LayoutAppComponent };
//# sourceMappingURL=app.component.js.map