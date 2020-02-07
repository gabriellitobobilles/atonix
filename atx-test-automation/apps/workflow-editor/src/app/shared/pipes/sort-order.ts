import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe for Reactive Forms. This will not work on normal variables
 * @example <caption>Example usage </caption>
 * *ngFor="let status of getTransitionIDs(item) | formSort:'id'"
 * @returns Returns for values in sorted order
 */
@Pipe({
  name: 'formSort',
  pure: false
})
export class FormSortPipe implements PipeTransform {
  transform(objectArray: any[], orderBy: string, sortAscending: boolean = true): any[] {
    return objectArray.sort((a, b) => {
      const leftSide = a.controls[orderBy].value;
      const rightSide = b.controls[orderBy].value;
      if (leftSide === rightSide) {
        return 0;
      }
      if (sortAscending) {
        return +(leftSide > rightSide);
      } else {
        return +(leftSide < rightSide);
      }
    });
  }
}
