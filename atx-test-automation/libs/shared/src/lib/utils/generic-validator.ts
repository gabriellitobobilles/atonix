import { FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';

// Implemented as a class, not a service,
// so it can be re-used and retain state for multiple forms.
export class GenericValidator {
  // Provide the set of valid validation messages.
  // Controls can be nested in sub FormGroups and sub FormArrays, but
  // the validationMessages object is flat, and therefore, the names
  // will need to be unique on the form for the flat validationMessages
  // to reach the respective (and only the respective) control.
  //
  // Structure:
  // controlName1: {
  //     validationRuleName1: 'Validation Message.',
  //     validationRuleName2: 'Validation Message.'
  // },
  // controlName2: {
  //     validationRuleName1: 'Validation Message.',
  //     validationRuleName2: 'Validation Message.'
  // }
  constructor(private validationMessages: { [key: string]: { [key: string]: string } }) {}

  processMessages(container: FormGroup): { [key: string]: string | object } {
    return this.processFormGroup(container);
  }

  private processSwitchyard(control: AbstractControl, controlName?: string) {
    if (control instanceof FormGroup) {
      return this.processFormGroup(control as FormGroup);
    } else if (control instanceof FormArray) {
      return this.processFormArray(control as FormArray, controlName || 'array');
    } else {
      return this.processFormControl(control as FormControl, controlName);
    }
  }

  private processFormGroup(controlGroup: FormGroup) {
    const messages = {};
    Object.entries(controlGroup.controls).forEach(([key, value]) => {
      messages[key] = this.processSwitchyard(value, key);
    });
    return messages;
  }

  private processFormArray(controlArray: FormArray, arrayName: string) {
    const messages = [];
    const childMessages = [];
    if (this.validationMessages[arrayName] && controlArray.errors) {
      Object.keys(controlArray.errors).map(errorKey => {
        if (this.validationMessages[arrayName][errorKey]) {
          messages.push(this.validationMessages[arrayName][errorKey]);
        }
      });
    }
    controlArray.controls.forEach(control => {
      childMessages.push(this.processSwitchyard(control));
    });
    const retObj = { controls: childMessages };
    if (messages.length > 0) {
      retObj['messages'] = messages.join(' ');
    }
    return retObj;
  }

  private processFormControl(formControl: FormControl, controlName: string): string {
    const messages = [];
    if (this.validationMessages[controlName] && formControl.errors && (formControl.dirty || formControl.touched)) {
      Object.keys(formControl.errors).map(messageKey => {
        if (this.validationMessages[controlName][messageKey]) {
          messages.push(this.validationMessages[controlName][messageKey]);
        }
      });
      return messages.join(' ');
    } else {
      return '';
    }
  }
}
