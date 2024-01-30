import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  apiBaseUrl = 'http://localhost:3001/api/';

  getUsers() {
    return this.http.get(this.apiBaseUrl + 'admin/get-all-users');
  }
}
