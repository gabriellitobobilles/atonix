import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { IAccountSetup } from '../../models/account-setup';

@Component({
  selector: 'atx-initial-password',
  templateUrl: './initial-password.component.html',
  styleUrls: ['../login-page.component.scss']
})
export class InitialPasswordComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;

  @Input() errorMessage: string | null;
  @Input() message: string | null;
  @Input() email: string;
  @Input() name: string;
  @Output() submitted = new EventEmitter<IAccountSetup>();
  @Output() cancelled = new EventEmitter();

  form: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl(''),
      rememberMe: new FormControl(true),
      name: new FormControl('', [Validators.required])
    },
    this.validate
  );

  constructor() {}

  ngOnInit() {
    this.form.setValue({
      name: this.name,
      email: this.email,
      password1: '',
      password2: '',
      rememberMe: true
    });
  }

  submit() {
    if (this.form.valid) {
      this.submitted.emit({
        username: this.form.value.email,
        password: this.form.value.password1,
        name: this.form.value.name,
        rememberMe: this.form.value.rememberMe
      });
    }
  }

  cancel() {
    this.cancelled.emit();
  }

  private validate(g: AbstractControl) {
    return g.get('password1').value === g.get('password2').value ? null : { mismatch: true };
  }
}
