import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'atx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../login-page.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  faEnvelope = faEnvelope;

  @Input() errorMessage: string | null;
  @Input() email: string;
  @Output() submitted = new EventEmitter<string>();
  @Output() cancelled = new EventEmitter();

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor() {}

  ngOnInit() {
    this.form.setValue({ email: this.email });
  }

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value.email);
    }
  }

  cancel() {
    this.cancelled.emit();
  }
}
