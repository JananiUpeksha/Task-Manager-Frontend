import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Use empty string or just "/api" since the proxy handles the base URL
  private baseUrl =  '/api'; 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/v1/user/signin`,  // Now: /api/v1/user/signin → Proxy → http://localhost:5050/task/api/v1/user/signin
      { username, password }
    ).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  signup(userData: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/v1/user/signup`,  // Now: /api/v1/user/signup → Proxy → http://localhost:5050/task/api/v1/user/signup
      userData
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    this.isAuthenticatedSubject.next(!!token);
  }
}