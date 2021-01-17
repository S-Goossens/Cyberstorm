import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

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

  sendPostRequest(endpoint: string, post_data: Object) {
    return this.http.post(this.URL.concat(endpoint), post_data, {
      responseType: 'json',
    });
  }

  sendPutRequest(endpoint: string, post_data: Object) {
    return this.http.put(this.URL.concat(endpoint), post_data, {
      responseType: 'json',
    });
  }
}
