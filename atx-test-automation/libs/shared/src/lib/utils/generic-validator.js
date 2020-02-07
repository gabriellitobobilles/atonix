import { FormGroup, FormArray } from '@angular/forms';
// Implemented as a class, not a service,
// so it can be re-used and retain state for multiple forms.
var GenericValidator = /** @class */ (function () {
    // Provide the set of valid validation messages.
    // Controls can be nested in sub FormGroups and sub FormArrays, but
    // the validationMessages object is flat, and therefore, the names
    // will need to be unique on the form for the flat validationMessages
    // to reach the respective (and only the respective) control.
    //
    // Structure:
    // controlName1: {
    //     validationRuleName1: 'Validation Message.',
    //     validationRuleName2: 'Validation Message.'
    // },
    // controlName2: {
    //     validationRuleName1: 'Validation Message.',
    //     validationRuleName2: 'Validation Message.'
    // }
    function GenericValidator(validationMessages) {
        this.validationMessages = validationMessages;
    }
    GenericValidator.prototype.processMessages = function (container) {
        return this.processFormGroup(container);
    };
    GenericValidator.prototype.processSwitchyard = function (control, controlName) {
        if (control instanceof FormGroup) {
            return this.processFormGroup(control);
        }
        else if (control instanceof FormArray) {
            return this.processFormArray(control, controlName || 'array');
        }
        else {
            return this.processFormControl(control, controlName);
        }
    };
    GenericValidator.prototype.processFormGroup = function (controlGroup) {
        var _this = this;
        var messages = {};
        Object.entries(controlGroup.controls).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            messages[key] = _this.processSwitchyard(value, key);
        });
        return messages;
    };
    GenericValidator.prototype.processFormArray = function (controlArray, arrayName) {
        var _this = this;
        var messages = [];
        var childMessages = [];
        if (this.validationMessages[arrayName] && controlArray.errors) {
            Object.keys(controlArray.errors).map(function (errorKey) {
                if (_this.validationMessages[arrayName][errorKey]) {
                    messages.push(_this.validationMessages[arrayName][errorKey]);
                }
            });
        }
        controlArray.controls.forEach(function (control) {
            childMessages.push(_this.processSwitchyard(control));
        });
        var retObj = { controls: childMessages };
        if (messages.length > 0) {
            retObj['messages'] = messages.join(' ');
        }
        return retObj;
    };
    GenericValidator.prototype.processFormControl = function (formControl, controlName) {
        var _this = this;
        var messages = [];
        if (this.validationMessages[controlName] && formControl.errors && (formControl.dirty || formControl.touched)) {
            Object.keys(formControl.errors).map(function (messageKey) {
                if (_this.validationMessages[controlName][messageKey]) {
                    messages.push(_this.validationMessages[controlName][messageKey]);
                }
            });
            return messages.join(' ');
        }
        else {
            return '';
        }
    };
    return GenericValidator;
}());
export { GenericValidator };
//# sourceMappingURL=generic-validator.js.map