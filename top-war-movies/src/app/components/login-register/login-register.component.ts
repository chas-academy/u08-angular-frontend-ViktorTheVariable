import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Lägg till denna
import { Router } from '@angular/router'; // Om du vill navigera efter login/register
import { CommonModule } from '@angular/common'; // För *ngIf i standalone

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss'
})
export class LoginRegisterComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginError: string | null = null;
  registerError: string | null = null;
  registerSuccess: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.loginError = null;
    const { username, password } = this.loginForm.value;
    this.auth.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/']); // Navigera till startsidan eller annan sida
      },
      error: (err) => {
        this.loginError = err.error?.message || 'Login failed';
      }
    });
  }

  register() {
    this.registerError = null;
    this.registerSuccess = null;
    const { username, password } = this.registerForm.value;
    this.auth.register(username, password).subscribe({
      next: () => {
        this.registerSuccess = 'Registration successful! You can now log in.';
        this.registerForm.reset();
      },
      error: (err) => {
        this.registerError = err.error?.message || 'Registration failed';
      }
    });
  }
}
