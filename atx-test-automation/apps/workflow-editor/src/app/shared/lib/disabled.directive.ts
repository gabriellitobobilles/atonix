import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[atxDisabled]'
})
export class DisabledDirective {
  @Input() set atxDisabled(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }
  constructor(private ngControl: NgControl) {}
}
