import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Authenticate } from '../../models/authenticate';
import { faCode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'atx-mfa-form',
  templateUrl: './mfa-form.component.html',
  styleUrls: ['../login-page.component.scss']
})
export class MfaFormComponent implements OnInit {
  faCode = faCode;

  @Input() errorMessage: string | null;

  @Input() isSoftwareToken: boolean;

  @Output() submitted = new EventEmitter<string>();

  form: FormGroup = new FormGroup({ code: new FormControl('') });

  constructor() {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value.code);
    }
  }
}
