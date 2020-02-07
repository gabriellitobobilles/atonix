/*ANGULAR*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule, EmailValidator } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
/*COMPONENT*/
import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  const form = {
    email: 'test@test.com'
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
      declarations: [ForgotPasswordComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
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
    expect(spy).toHaveBeenCalledWith(form.email);
  });

  it('should emit an event on cancel', () => {
    const spy = spyOn(component.cancelled, 'emit');
    component.cancel();
    expect(spy).toHaveBeenCalled();
  });
});
