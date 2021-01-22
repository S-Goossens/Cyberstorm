import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RequestService } from '../shared/services/request.service';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private endpoint = 'orders';

  constructor(private requestService: RequestService) {}

  public getOrders() {
    return this.requestService.sendGetRequest(this.endpoint).pipe(
      map((response) => {
        console.log(response);
        const orderArray: Order[] = [];
        for (const order in response['orders']) {
          orderArray.push(response['orders'][order]);
        }
        return orderArray;
      })
    );
  }
}
