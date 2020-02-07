import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var AsNumberPipe = /** @class */ (function () {
    function AsNumberPipe() {
    }
    AsNumberPipe.prototype.transform = function (value) {
        return Number(value);
    };
    AsNumberPipe = tslib_1.__decorate([
        Pipe({
            name: 'asNumber'
        })
    ], AsNumberPipe);
    return AsNumberPipe;
}());
export { AsNumberPipe };
//# sourceMappingURL=as-number.pipe.js.map