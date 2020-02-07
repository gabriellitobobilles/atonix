/*ANGULAR*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
/*COMPONENT*/
import { InitialPasswordComponent } from './initial-password.component';

describe('InitialPasswordComponent', () => {
  let component: InitialPasswordComponent;
  let fixture: ComponentFixture<InitialPasswordComponent>;

  const form = {
    name: 'atonixTest',
    email: 'test@test.com',
    password1: '12345678',
    password2: '12345678',
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
      declarations: [InitialPasswordComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialPasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should set value of email and name from inputs', () => {
      component.email = form.email;
      component.name = form.name;
      fixture.detectChanges();
      expect(component.form.value.email).toBe(form.email);
      expect(component.form.value.name).toBe(form.name);
    });
  });

  it('should emit an event on submit', () => {
    component.form.setValue(form);
    const spy = spyOn(component.submitted, 'emit');
    component.submit();
    expect(spy).toHaveBeenCalledWith({
      username: form.email,
      password: form.password1,
      name: form.name,
      rememberMe: form.rememberMe
    });
  });

  it('should emit an event on cancel', () => {
    const spy = spyOn(component.cancelled, 'emit');
    component.cancel();
    expect(spy).toHaveBeenCalled();
  });
});
