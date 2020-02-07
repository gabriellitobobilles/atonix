import { throwError } from 'rxjs';
import * as _ from 'lodash';
var ThrowMessage = /** @class */ (function () {
    function ThrowMessage() {
    }
    ThrowMessage.error = function (err) {
        if (_.isNil(err)) {
            return;
        }
        if ((!_.isNil(err.status) && err.status === 404) || err.status === 400) {
            return throwError(err.statusText);
        }
        if (!_.isNil(err.message)) {
            if (err.message === 'Network error') {
                return throwError('External service is currently unavailable.');
            }
            if (err.error) {
                if (!_.isNil(err.error.error_description)) {
                    return throwError(err.error.error_description);
                }
                if (!_.isNil(err.error.ExceptionMessage)) {
                    return throwError(err.error.ExceptionMessage);
                }
            }
            // grab the first two words of error. Is it an http failure? if so, let the user know the service is unavailable.
            var error = err.message.match(new RegExp('[\\w\\.]+' + '(?:[\\s-]*[\\w\\.]+){0,' + (2 - 1) + '}'));
            var message = error === undefined || error === null ? '' : error[0].toLowerCase();
            if (message === 'http failure') {
                return throwError('Service is currently unavailable.');
            }
        }
        var errorMessage = err.error instanceof ErrorEvent ? "An error occurred: " + err.error.message : 'An unknown error occurred.';
        return throwError(errorMessage);
    };
    return ThrowMessage;
}());
export { ThrowMessage };
//# sourceMappingURL=handle-errors.js.map