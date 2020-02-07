import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';

@Pipe({
  name: 'valueFromEachGroup'
})
export class ValueFromEachGroupPipe implements PipeTransform {
  transform(formArray: FormArray, selector: string) {
    return formArray.controls.map(c => c.value[selector]);
  }
}
