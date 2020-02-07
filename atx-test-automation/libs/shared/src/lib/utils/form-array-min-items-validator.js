var FormArrayMinItemsValidator = /** @class */ (function () {
    function FormArrayMinItemsValidator() {
    }
    FormArrayMinItemsValidator.minItems = function (minItems) {
        return function (fa) {
            var formArray = fa;
            return formArray.length >= minItems ? null : { minItems: true };
        };
    };
    return FormArrayMinItemsValidator;
}());
export { FormArrayMinItemsValidator };
//# sourceMappingURL=form-array-min-items-validator.js.map