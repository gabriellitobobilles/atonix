import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { UserFacade } from '@AtonixWebSites/auth';
var AppOverlayComponent = /** @class */ (function () {
    function AppOverlayComponent(userFacade) {
        this.userFacade = userFacade;
        this.cancel = new EventEmitter();
    }
    AppOverlayComponent.prototype.ngOnInit = function () {
        this.appContexts$ = this.userFacade.appContexts$;
        this.selectedAppContext$ = this.userFacade.selectedAppContext$;
    };
    AppOverlayComponent.prototype.setAppContext = function (appContext) {
        this.userFacade.setAppContext(appContext.AppContextID);
        this.cancel.emit();
    };
    AppOverlayComponent.prototype.ngOnDestroy = function () { };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], AppOverlayComponent.prototype, "cancel", void 0);
    AppOverlayComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-app-overlay',
            templateUrl: './app-overlay.component.html',
            styleUrls: ['./app-overlay.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [UserFacade])
    ], AppOverlayComponent);
    return AppOverlayComponent;
}());
export { AppOverlayComponent };
//# sourceMappingURL=app-overlay.component.js.map