var ChildrenUniquePropertyValidator = /** @class */ (function () {
    function ChildrenUniquePropertyValidator() {
    }
    ChildrenUniquePropertyValidator.childrenUniqueProperty = function (childPropertyName) {
        return function (fa) {
            var formArray = fa;
            var distinctValues = [];
            var duplicateFound = false;
            var _loop_1 = function (child) {
                var value = child.controls[childPropertyName].value;
                var matching = distinctValues.filter(function (v) { return v === value; });
                if (matching.length > 0) {
                    duplicateFound = true;
                    return "break";
                }
                else {
                    distinctValues.push(value);
                }
            };
            for (var _i = 0, _a = formArray.controls; _i < _a.length; _i++) {
                var child = _a[_i];
                var state_1 = _loop_1(child);
                if (state_1 === "break")
                    break;
            }
            return duplicateFound ? { childrenUniqueProperty: true } : null;
        };
    };
    return ChildrenUniquePropertyValidator;
}());
export { ChildrenUniquePropertyValidator };
//# sourceMappingURL=children-unique-property-validator.js.map