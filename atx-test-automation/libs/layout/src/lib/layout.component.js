// This class is inherited by the single/double and triple panel layouts.
// Any code that can be generalized should be generalized here.
import * as tslib_1 from "tslib";
import { Input, HostListener } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
var mainPanelPadding = 5;
var LayoutComponent = /** @class */ (function () {
    function LayoutComponent(sanitizer, authFacade, userFacade, layoutFacade) {
        this.sanitizer = sanitizer;
        this.authFacade = authFacade;
        this.userFacade = userFacade;
        this.layoutFacade = layoutFacade;
        // These are set by the application.  They typically won't change
        this.atxTitle = 'Atonix Application';
        this.componentActive = true;
    }
    // Things that will change at runtime
    LayoutComponent.prototype.onResize = function (event) {
        this.centerPanelWidthStyle = event.target.innerWidth - this.sidebarWidthAndPadding + "px";
    };
    LayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loggedIn$ = this.authFacade.loggedIn$;
        this.authUser$ = this.authFacade.authUser$;
        this.accountModelUser$ = this.userFacade.accountModelUser$;
        this.appContexts$ = this.userFacade.appContexts$;
        this.isAssetNavigatorOpened$ = this.layoutFacade.isAssetNavigatorOpened$;
        this.isTimeSelectorOpened$ = this.layoutFacade.isTimeSelectorOpened$;
        this.assetNavigatorWidth$ = this.layoutFacade.currentAssetNavigatorWidth$;
        this.useLightTheme$ = this.userFacade.lightTheme$;
        this.layoutFacade.currentAssetNavigatorWidth$.pipe(takeWhile(function () { return _this.componentActive; })).subscribe(function (width) {
            _this.sidebarWidthAndPadding = width + mainPanelPadding;
            _this.centerPanelWidthStyle = window.innerWidth - _this.sidebarWidthAndPadding + "px";
        });
        this.layoutFacade.getMainPanelBottom$.pipe(takeWhile(function () { return _this.componentActive; })).subscribe(function (height) {
            _this.centerPanelHeight = _this.sanitizer.bypassSecurityTrustStyle("calc(100% - " + height + "px)");
            _this.timeSliderHeight = _this.sanitizer.bypassSecurityTrustStyle(height - 5 + "px");
        });
        this.timeSelectorHeight$ = this.layoutFacade.timeSelectorHeight$;
        this.mainPanelBottom$ = this.layoutFacade.getMainPanelBottom$;
        this.authFacade.loggedIn$.pipe(takeWhile(function () { return _this.componentActive; })).subscribe(function (loggedIn) {
            if (loggedIn) {
                _this.userFacade.loadUserInfo();
                _this.userFacade.loadAppContexts();
                _this.authFacade.getTimeout();
            }
        });
        this.authFacade.getTimeoutInSeconds$.pipe(takeWhile(function () { return _this.componentActive; })).subscribe(function (timeoutInSeconds) {
            if (timeoutInSeconds > 0) {
                _this.authFacade.startInactivityService(timeoutInSeconds);
            }
        });
    };
    LayoutComponent.prototype.logout = function () {
        this.layoutFacade.closeAssetNavigator();
        this.layoutFacade.closeTimeSelector();
        this.authFacade.logout();
    };
    LayoutComponent.prototype.toggleTimeSelector = function () {
        this.layoutFacade.toggleTimeSelector();
    };
    LayoutComponent.prototype.toggleAssetNavigator = function () {
        this.layoutFacade.toggleAssetNavigator();
    };
    LayoutComponent.prototype.onResizeEnd = function (event) {
        if (event.rectangle) {
            this.layoutFacade.setAssetNavigatorWidth(Number(event.rectangle.right));
        }
    };
    LayoutComponent.prototype.ngOnDestroy = function () {
        this.componentActive = false;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LayoutComponent.prototype, "atxTitle", void 0);
    tslib_1.__decorate([
        HostListener('window:resize', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], LayoutComponent.prototype, "onResize", null);
    return LayoutComponent;
}());
export { LayoutComponent };
//# sourceMappingURL=layout.component.js.map