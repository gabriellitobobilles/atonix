import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Authenticate } from '../../models/authenticate';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'atx-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../login-page.component.scss']
})
export class LoginFormComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;

  @Input() errorMessage: string | null;
  @Input() message: string | null;

  @Output() submitted = new EventEmitter<Authenticate>();
  @Output() showForgotPassword = new EventEmitter<Authenticate>();
  @Output() showCodeForm = new EventEmitter<Authenticate>();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(true)
  });

  constructor() {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.submitted.emit({
        username: this.form.value.username,
        password: this.form.value.password,
        rememberMe: this.form.value.rememberMe
      });
    }
  }

  forgotPassword() {
    this.showForgotPassword.emit({
      username: this.form.value.username,
      password: this.form.value.password,
      rememberMe: this.form.value.rememberMe
    });
  }

  showCode() {
    this.showCodeForm.emit({
      username: this.form.value.username,
      password: this.form.value.password,
      rememberMe: this.form.value.rememberMe
    });
  }
}
