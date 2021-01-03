import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestService } from '../shared/services/request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = 'auth';
  constructor(private requestService: RequestService) {}

  login(email: string, password: string) {
    return this.requestService.sendPostRequest(this.endpoint + '/login', {
      email: email,
      password: password,
    });
  }
}
