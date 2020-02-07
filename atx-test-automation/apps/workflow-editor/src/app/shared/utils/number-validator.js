var NumberValidators = /** @class */ (function () {
    function NumberValidators() {
    }
    NumberValidators.range = function (min, max) {
        return function (c) {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { range: true };
            }
            return null;
        };
    };
    return NumberValidators;
}());
export { NumberValidators };
//# sourceMappingURL=number-validator.js.map