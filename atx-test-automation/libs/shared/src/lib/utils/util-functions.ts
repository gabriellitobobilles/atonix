import { HttpParams } from '@angular/common/http';
import { isNil, isPlainObject } from 'lodash';

// Helper class for turning numbers and booleans into strings for HttpParams
// See: https://github.com/angular/angular/issues/23856. Still open issue.
export class UtilFunctions {
  static buildQueryParams(source): HttpParams {
    let target: HttpParams = new HttpParams();
    Object.keys(source).forEach((key: string) => {
      let value: any = source[key];
      if (isNil(value)) {
        console.error(`invalid parameter: ${source}`);
        return;
      }
      value = isPlainObject(value) ? JSON.stringify(value) : value.toString();
      target = target.append(key, value);
    });
    return target;
  }
}
