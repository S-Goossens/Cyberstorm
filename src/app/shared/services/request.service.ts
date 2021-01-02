import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  URL: string;

  constructor(private http: HttpClient) {
    this.URL = 'http://localhost:8080/';
  }

  sendGetRequest(endpoint: string) {
    return this.http.get(this.URL.concat(endpoint), { responseType: 'json' });
  }
}
