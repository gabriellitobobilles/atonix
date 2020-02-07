import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asNumber'
})
export class AsNumberPipe implements PipeTransform {
  transform(value: any): number {
    return Number(value);
  }
}
