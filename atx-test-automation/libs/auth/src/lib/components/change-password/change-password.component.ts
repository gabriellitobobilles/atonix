import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, AbstractControl, Validators } from '@angular/forms';

import { faEnvelope, faLock, faCode } from '@fortawesome/free-solid-svg-icons';
import { PasswordChange } from '../../models/password-change';

@Component({
  selector: 'atx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../login-page.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl(''),
      code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      rememberMe: new FormControl(true)
    },
    this.validate
  );

  faEnvelope = faEnvelope;
  faLock = faLock;
  faCode = faCode;

  @Input() errorMessage: string | null;
  @Input() email: string;
  @Output() submitted = new EventEmitter<PasswordChange>();
  @Output() cancelled = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.form.patchValue({ email: this.email });
  }

  private validate(g: AbstractControl) {
    return g.get('password1').value === g.get('password2').value ? null : { mismatch: true };
  }

  submit() {
    if (this.form.valid) {
      this.submitted.emit({
        email: this.form.value.email,
        password: this.form.value.password1,
        code: this.form.value.code,
        rememberMe: this.form.value.rememberMe
      });
    }
  }

  cancel() {
    this.cancelled.emit();
  }
}
