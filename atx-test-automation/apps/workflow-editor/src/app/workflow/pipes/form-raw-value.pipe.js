import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
var FormRawValuePipe = /** @class */ (function () {
    function FormRawValuePipe() {
    }
    FormRawValuePipe.prototype.transform = function (control, valueSelector) {
        var formValue = null;
        if (control instanceof FormGroup) {
            formValue = control.getRawValue();
        }
        else if (control instanceof FormArray) {
            formValue = control.getRawValue();
        }
        else {
            formValue = control.value;
        }
        var returnValue = formValue;
        if (valueSelector) {
            valueSelector.split('.').forEach(function (selector) {
                returnValue = returnValue[selector];
            });
        }
        return returnValue;
    };
    FormRawValuePipe = tslib_1.__decorate([
        Pipe({
            name: 'formRawValue'
        })
    ], FormRawValuePipe);
    return FormRawValuePipe;
}());
export { FormRawValuePipe };
//# sourceMappingURL=form-raw-value.pipe.js.map