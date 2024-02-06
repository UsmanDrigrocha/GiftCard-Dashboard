import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   Router,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiBaseUrl = 'http://localhost:3001/api/';
  private _isAuthenticated: boolean = false;

  constructor(private http: HttpClient) {
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    const token = localStorage.getItem('token');
    this._isAuthenticated = !!token;
  }

  login(email: string, password: string): any {
    return this.http.post(this.apiBaseUrl + 'auth/login', { email, password });
  }

  logout(): void {
    this._isAuthenticated = false;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    this._isAuthenticated = !!token;
    return this._isAuthenticated;
  }
}
