import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'allowbleNextStatusTranspose'
})
export class AllowableNextStatusTransposePipe implements PipeTransform {
  transform(resolutionStatusesAllowedTransitions: boolean[][], myIndex: number): boolean[] {
    if (_.isNil(resolutionStatusesAllowedTransitions) || !resolutionStatusesAllowedTransitions.length) {
      return [];
    }
    if (_.isNil(resolutionStatusesAllowedTransitions[0])) {
      return []; // corner case where this is still only one resolution status.
    }

    const allowedTransitions = resolutionStatusesAllowedTransitions.map(__ => false);
    resolutionStatusesAllowedTransitions.forEach((resStatusAllowedTransitions: boolean[], resStatusIndex: number) => {
      allowedTransitions[resStatusIndex] = resStatusAllowedTransitions[myIndex];
    });

    return allowedTransitions;
  }
}
