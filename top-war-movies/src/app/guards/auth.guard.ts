import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  // To ensure only logged in users can access movie details.
  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['/login-register']);
    return false;
  }
}
