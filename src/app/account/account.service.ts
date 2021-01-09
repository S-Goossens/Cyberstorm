import { Injectable } from '@angular/core';
import { RequestService } from '../shared/services/request.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private requestService: RequestService) {}

  getUser() {
    return this.requestService.sendGetRequest('users');
  }

  getOrders() {
    return this.requestService.sendGetRequest('orders');
  }
}
