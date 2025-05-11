import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRegisterComponent } from './login-register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;
  let mockAuth: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuth = {
      login: jasmine.createSpy(),
      register: jasmine.createSpy()
    };
    mockRouter = {
      navigate: jasmine.createSpy()
    };

    await TestBed.configureTestingModule({
      imports: [LoginRegisterComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuth },
        { provide: Router, useValue: mockRouter },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login and register forms', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.registerForm).toBeTruthy();
    expect(component.loginForm.get('username')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
    expect(component.registerForm.get('username')).toBeTruthy();
    expect(component.registerForm.get('password')).toBeTruthy();
  });

  it('loginForm should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('registerForm should be invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalse();
  });
 
});
