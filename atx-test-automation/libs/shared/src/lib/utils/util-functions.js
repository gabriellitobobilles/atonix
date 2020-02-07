import { HttpParams } from '@angular/common/http';
import { isNil, isPlainObject } from 'lodash';
// Helper class for turning numbers and booleans into strings for HttpParams
// See: https://github.com/angular/angular/issues/23856. Still open issue.
var UtilFunctions = /** @class */ (function () {
    function UtilFunctions() {
    }
    UtilFunctions.buildQueryParams = function (source) {
        var target = new HttpParams();
        Object.keys(source).forEach(function (key) {
            var value = source[key];
            if (isNil(value)) {
                console.error("invalid parameter: " + source);
                return;
            }
            value = isPlainObject(value) ? JSON.stringify(value) : value.toString();
            target = target.append(key, value);
        });
        return target;
    };
    return UtilFunctions;
}());
export { UtilFunctions };
//# sourceMappingURL=util-functions.js.map