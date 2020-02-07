import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserFacade } from '@AtonixWebSites/auth';
var AppComponent = /** @class */ (function () {
    function AppComponent(userFacade) {
        this.userFacade = userFacade;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.appContextID$ = this.userFacade.selectedAppContextID$;
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [UserFacade])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map