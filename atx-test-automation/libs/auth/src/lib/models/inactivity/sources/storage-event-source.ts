import { EventSource } from './event-source';
import * as _ from 'lodash';

// If multiple windows are open, this picks up events on other windows.
export class StorageEventSource extends EventSource {
  constructor() {
    super(window, ['storage'], 500, false);
  }

  isValidEventTrigger(event: StorageEvent): boolean {
    // firing on storage event. Make sure it is firing on the right event, the ExpireTime variable we write
    if (!_.isNil(event.key) && event.key.indexOf('ExpireTime') >= 0) {
      return true;
    }
    return false;
  }
}
