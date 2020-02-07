import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class InactivityLocalStorageService {
  constructor() {}

  setExpirationTime(value: Date) {
    if (!_.isNil(value)) {
      window.localStorage.setItem('ExpireTime', value.getTime().toString());
    } else {
      window.localStorage.removeItem('ExpireTime');
    }
  }

  getExpirationTime(): Date {
    const expireTime: string = window.localStorage.getItem('ExpireTime');
    if (expireTime) {
      return new Date(parseInt(expireTime, 10));
    } else {
      return null;
    }
  }

  setCountdownWarning(value: boolean) {
    if (value) {
      window.localStorage.setItem('CountdownWarning', 'true');
    } else {
      window.localStorage.setItem('CountdownWarning', 'false');
    }
  }

  isExpired(): boolean {
    const expirationTime = this.getExpirationTime();
    return expirationTime != null && expirationTime <= new Date();
  }
}
