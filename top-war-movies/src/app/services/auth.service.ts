import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(environment.apiUrl + environment.apiVersion + '/auth/login', { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.loggedIn.next(true);
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiVersion + '/auth/register', { username, password });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return !!payload.isAdmin;
    } catch {
      return false;
    }
  }
  
}
