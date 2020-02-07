import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
/**
 * Pipe for Reactive Forms. This will not work on normal variables
 * @example <caption>Example usage </caption>
 * *ngFor="let status of getTransitionIDs(item) | formSort:'id'"
 * @returns Returns for values in sorted order
 */
var FormSortPipe = /** @class */ (function () {
    function FormSortPipe() {
    }
    FormSortPipe.prototype.transform = function (objectArray, orderBy, sortAscending) {
        if (sortAscending === void 0) { sortAscending = true; }
        return objectArray.sort(function (a, b) {
            var leftSide = a.controls[orderBy].value;
            var rightSide = b.controls[orderBy].value;
            if (leftSide === rightSide) {
                return 0;
            }
            if (sortAscending) {
                return +(leftSide > rightSide);
            }
            else {
                return +(leftSide < rightSide);
            }
        });
    };
    FormSortPipe = tslib_1.__decorate([
        Pipe({
            name: 'formSort',
            pure: false
        })
    ], FormSortPipe);
    return FormSortPipe;
}());
export { FormSortPipe };
//# sourceMappingURL=sort-order.js.map