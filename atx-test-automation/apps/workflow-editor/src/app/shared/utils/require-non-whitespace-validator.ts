import { AbstractControl } from '@angular/forms';

export function requireNonWhitespaceValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const controlString = String(control.value);
  const controlStringTrimmed = controlString.trim();
  const inValid = controlString.length > 0 && controlStringTrimmed.length === 0;
  return inValid ? { requireNonWhitespace: true } : null;
}
