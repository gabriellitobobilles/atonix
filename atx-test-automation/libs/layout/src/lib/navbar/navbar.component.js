import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { faCalendar, faTh } from '@fortawesome/free-solid-svg-icons';
import { AppOverlayService } from '../app-overlay/app-overlay-service';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(appOverlayService) {
        this.appOverlayService = appOverlayService;
        this.faCalendar = faCalendar;
        this.faTh = faTh;
        this.toggleAssetNavigator = new EventEmitter();
        this.toggleTimeSelector = new EventEmitter();
        this.logOut = new EventEmitter();
        this.atxTitle = 'Atonix App';
        this.loggedIn = false;
        this.showAssetNavigatorButton = false;
        this.showTimeSelectorButton = false;
    }
    NavbarComponent.prototype.showAppContext = function () {
        var appOverlayRef = this.appOverlayService.open(this.origin);
    };
    NavbarComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], NavbarComponent.prototype, "toggleAssetNavigator", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], NavbarComponent.prototype, "toggleTimeSelector", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], NavbarComponent.prototype, "logOut", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NavbarComponent.prototype, "atxTitle", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NavbarComponent.prototype, "loggedIn", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NavbarComponent.prototype, "authUser", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NavbarComponent.prototype, "accountModelUser", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NavbarComponent.prototype, "showAssetNavigatorButton", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NavbarComponent.prototype, "showTimeSelectorButton", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], NavbarComponent.prototype, "logoClass", void 0);
    tslib_1.__decorate([
        ViewChild(CdkOverlayOrigin),
        tslib_1.__metadata("design:type", CdkOverlayOrigin)
    ], NavbarComponent.prototype, "origin", void 0);
    NavbarComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AppOverlayService])
    ], NavbarComponent);
    return NavbarComponent;
}());
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map