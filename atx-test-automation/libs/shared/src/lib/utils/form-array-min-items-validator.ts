import { AbstractControl, ValidatorFn, FormArray, FormGroup } from '@angular/forms';

export class FormArrayMinItemsValidator {
  static minItems(minItems: number): ValidatorFn {
    return (
      fa: AbstractControl
    ): {
      [key: string]: boolean;
    } | null => {
      const formArray = fa as FormArray;
      return formArray.length >= minItems ? null : { minItems: true };
    };
  }
}
