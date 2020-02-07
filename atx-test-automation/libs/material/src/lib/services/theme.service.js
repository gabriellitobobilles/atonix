import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var ThemeService = /** @class */ (function () {
    function ThemeService() {
        this.lightTheme = new Subject();
        this.useLightTheme = this.lightTheme.asObservable();
    }
    ThemeService.prototype.setDarkTheme = function (useLightTheme) {
        this.lightTheme.next(useLightTheme);
    };
    ThemeService = tslib_1.__decorate([
        Injectable()
    ], ThemeService);
    return ThemeService;
}());
export { ThemeService };
//# sourceMappingURL=theme.service.js.map