import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var ValueFromEachGroupPipe = /** @class */ (function () {
    function ValueFromEachGroupPipe() {
    }
    ValueFromEachGroupPipe.prototype.transform = function (formArray, selector) {
        return formArray.controls.map(function (c) { return c.value[selector]; });
    };
    ValueFromEachGroupPipe = tslib_1.__decorate([
        Pipe({
            name: 'valueFromEachGroup'
        })
    ], ValueFromEachGroupPipe);
    return ValueFromEachGroupPipe;
}());
export { ValueFromEachGroupPipe };
//# sourceMappingURL=value-from-each-group.pipe.js.map