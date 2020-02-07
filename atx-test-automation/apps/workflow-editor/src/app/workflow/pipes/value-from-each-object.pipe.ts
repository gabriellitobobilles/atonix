import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueFromEachObject'
})
export class ValueFromEachObjectPipe implements PipeTransform {
  transform(arr: object[], selector: string) {
    return arr.map(c => c[selector]);
  }
}
