import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var ValueFromEachObjectPipe = /** @class */ (function () {
    function ValueFromEachObjectPipe() {
    }
    ValueFromEachObjectPipe.prototype.transform = function (arr, selector) {
        return arr.map(function (c) { return c[selector]; });
    };
    ValueFromEachObjectPipe = tslib_1.__decorate([
        Pipe({
            name: 'valueFromEachObject'
        })
    ], ValueFromEachObjectPipe);
    return ValueFromEachObjectPipe;
}());
export { ValueFromEachObjectPipe };
//# sourceMappingURL=value-from-each-object.pipe.js.map