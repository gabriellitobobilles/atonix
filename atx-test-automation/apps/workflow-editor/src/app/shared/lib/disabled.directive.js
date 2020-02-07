import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
var DisabledDirective = /** @class */ (function () {
    function DisabledDirective(ngControl) {
        this.ngControl = ngControl;
    }
    Object.defineProperty(DisabledDirective.prototype, "atxDisabled", {
        set: function (condition) {
            var action = condition ? 'disable' : 'enable';
            this.ngControl.control[action]();
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], DisabledDirective.prototype, "atxDisabled", null);
    DisabledDirective = tslib_1.__decorate([
        Directive({
            selector: '[atxDisabled]'
        }),
        tslib_1.__metadata("design:paramtypes", [NgControl])
    ], DisabledDirective);
    return DisabledDirective;
}());
export { DisabledDirective };
//# sourceMappingURL=disabled.directive.js.map