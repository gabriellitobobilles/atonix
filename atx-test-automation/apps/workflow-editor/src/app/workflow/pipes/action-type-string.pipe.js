import * as tslib_1 from "tslib";
import { ActionTypes } from './../model/actions';
import { Pipe } from '@angular/core';
var ActionTypeStringPipe = /** @class */ (function () {
    function ActionTypeStringPipe() {
    }
    ActionTypeStringPipe.prototype.transform = function (actionTypeID) {
        var matchingObjects = ActionTypes.filter(function (a) { return a.ActionTypeID === Number(actionTypeID); });
        return matchingObjects.length > 0 ? matchingObjects[0].ActionTypeDesc : 'Unknown action type';
    };
    ActionTypeStringPipe = tslib_1.__decorate([
        Pipe({
            name: 'actionTypeString'
        })
    ], ActionTypeStringPipe);
    return ActionTypeStringPipe;
}());
export { ActionTypeStringPipe };
//# sourceMappingURL=action-type-string.pipe.js.map