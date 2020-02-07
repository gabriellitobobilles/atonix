import * as tslib_1 from "tslib";
import { EventSource } from './event-source';
import * as _ from 'lodash';
// If multiple windows are open, this picks up events on other windows.
var StorageEventSource = /** @class */ (function (_super) {
    tslib_1.__extends(StorageEventSource, _super);
    function StorageEventSource() {
        return _super.call(this, window, ['storage'], 500, false) || this;
    }
    StorageEventSource.prototype.isValidEventTrigger = function (event) {
        // firing on storage event. Make sure it is firing on the right event, the ExpireTime variable we write
        if (!_.isNil(event.key) && event.key.indexOf('ExpireTime') >= 0) {
            return true;
        }
        return false;
    };
    return StorageEventSource;
}(EventSource));
export { StorageEventSource };
//# sourceMappingURL=storage-event-source.js.map