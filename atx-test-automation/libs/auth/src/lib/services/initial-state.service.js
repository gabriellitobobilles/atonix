import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { AuthConfigService } from './auth-config.service';
var InitialStateService = /** @class */ (function () {
    function InitialStateService(config) {
        this.config = config;
    }
    InitialStateService.prototype.getAppContext = function () {
        return this.config;
    };
    InitialStateService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(AuthConfigService)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], InitialStateService);
    return InitialStateService;
}());
export { InitialStateService };
//# sourceMappingURL=initial-state.service.js.map