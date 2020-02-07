import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import * as _ from 'lodash';
var AllowableNextStatusTransposePipe = /** @class */ (function () {
    function AllowableNextStatusTransposePipe() {
    }
    AllowableNextStatusTransposePipe.prototype.transform = function (resolutionStatusesAllowedTransitions, myIndex) {
        if (_.isNil(resolutionStatusesAllowedTransitions) || !resolutionStatusesAllowedTransitions.length) {
            return [];
        }
        if (_.isNil(resolutionStatusesAllowedTransitions[0])) {
            return []; // corner case where this is still only one resolution status.
        }
        var allowedTransitions = resolutionStatusesAllowedTransitions.map(function (__) { return false; });
        resolutionStatusesAllowedTransitions.forEach(function (resStatusAllowedTransitions, resStatusIndex) {
            allowedTransitions[resStatusIndex] = resStatusAllowedTransitions[myIndex];
        });
        return allowedTransitions;
    };
    AllowableNextStatusTransposePipe = tslib_1.__decorate([
        Pipe({
            name: 'allowbleNextStatusTranspose'
        })
    ], AllowableNextStatusTransposePipe);
    return AllowableNextStatusTransposePipe;
}());
export { AllowableNextStatusTransposePipe };
//# sourceMappingURL=allowable-next-status-transpose.pipe.js.map