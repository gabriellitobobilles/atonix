import { environment } from '../../../../build/environments/environment';
import { throwError } from 'rxjs';
var BaseModel = /** @class */ (function () {
    function BaseModel(path) {
        this.path = path;
    }
    BaseModel.prototype.GetUrl = function (service) {
        var myPath = this.path + service;
        if (myPath[0] !== '/') {
            myPath = '/' + myPath;
        }
        return environment.baseUrl + myPath;
    };
    BaseModel.prototype.HandleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", " + ("body was: " + error.error));
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
    // There is some legacy stuff in the web services that change the format of the objects returned.
    // The format is ugly and doesn't map well to straight json.  This method will take care of those
    // objects by translating the member names to normal json.
    BaseModel.prototype.StripOutCrap = function (something) {
        if (something) {
            for (var field in something) {
                if (field.indexOf('<') >= 0) {
                    something[field.substring(field.indexOf('<') + 1, field.indexOf('>'))] = something[field];
                    delete something[field];
                }
            }
        }
    };
    return BaseModel;
}());
export { BaseModel };
//# sourceMappingURL=base-model.js.map