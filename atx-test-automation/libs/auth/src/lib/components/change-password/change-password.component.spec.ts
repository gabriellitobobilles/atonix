/*ANGULAR*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
/*COMPONENT*/
import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  const form = {
    email: 'test@test.com',
    password1: '12345678',
    password2: '12345678',
    code: '123456',
    rememberMe: true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        FontAwesomeModule,
        NoopAnimationsModule
      ],
      declarations: [ChangePasswordComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should set value of email from input', () => {
      component.email = form.email;
      fixture.detectChanges();
      expect(component.form.value.email).toBe(form.email);
    });
  });

  it('should emit an event on submit', () => {
    component.form.setValue(form);
    const spy = spyOn(component.submitted, 'emit');
    component.submit();
    expect(spy).toHaveBeenCalledWith({
      email: form.email,
      password: form.password1,
      code: form.code,
      rememberMe: form.rememberMe
    });
  });

  it('should emit an event on cancel', () => {
    const spy = spyOn(component.cancelled, 'emit');
    component.cancel();
    expect(spy).toHaveBeenCalled();
  });
});
