import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup, FormArray } from '@angular/forms';

@Pipe({
  name: 'formRawValue'
})
export class FormRawValuePipe implements PipeTransform {
  transform(control: AbstractControl, valueSelector?: string): any {
    let formValue = null;
    if (control instanceof FormGroup) {
      formValue = (control as FormGroup).getRawValue();
    } else if (control instanceof FormArray) {
      formValue = (control as FormArray).getRawValue();
    } else {
      formValue = control.value;
    }

    let returnValue = formValue;

    if (valueSelector) {
      valueSelector.split('.').forEach(selector => {
        returnValue = returnValue[selector];
      });
    }

    return returnValue;
  }
}
