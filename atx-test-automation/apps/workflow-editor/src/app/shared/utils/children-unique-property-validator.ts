import { AbstractControl, ValidatorFn, FormArray, FormGroup } from '@angular/forms';

export class ChildrenUniquePropertyValidator {
  static childrenUniqueProperty(childPropertyName: string): ValidatorFn {
    return (
      fa: AbstractControl
    ): {
      [key: string]: boolean;
    } | null => {
      const formArray = fa as FormArray;
      const distinctValues = [];
      let duplicateFound = false;
      for (const child of formArray.controls) {
        const value = (child as FormGroup).controls[childPropertyName].value;
        const matching = distinctValues.filter(v => v === value);
        if (matching.length > 0) {
          duplicateFound = true;
          break;
        } else {
          distinctValues.push(value);
        }
      }
      return duplicateFound ? { childrenUniqueProperty: true } : null;
    };
  }
}
