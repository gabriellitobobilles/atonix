export function requireNonWhitespaceValidator(control) {
    var controlString = String(control.value);
    var controlStringTrimmed = controlString.trim();
    var inValid = controlString.length > 0 && controlStringTrimmed.length === 0;
    return inValid ? { requireNonWhitespace: true } : null;
}
//# sourceMappingURL=require-non-whitespace-validator.js.map