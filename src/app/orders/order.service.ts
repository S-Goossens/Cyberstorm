import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestService } from '../shared/services/request.service';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private endpoint = 'orders';
  public ordersChanged = new Subject<any>();

  constructor(private requestService: RequestService) {}

  public getOrders() {
    return this.requestService.sendGetRequest(this.endpoint).pipe(
      map((response) => {
        const orderArray: Order[] = [];
        for (const order in response['orders']) {
          orderArray.push(response['orders'][order]);
        }
        return orderArray;
      })
    );
  }

  public getOrder(id: string) {
    return this.requestService.sendGetRequest(this.endpoint + '/' + id).pipe(
      map((response) => {
        return response['order'] as Order;
      })
    );
  }

  public updateOrder(id: string, totalPrice: number, status: string) {
    return this.requestService
      .sendPutRequest(this.endpoint + '/' + id, {
        totalPrice: totalPrice,
        status: status,
      })
      .pipe(
        map((response) => {
          if (response['order']) {
            return response['order'] as Order;
          }
        })
      );
  }

  public deleteOrder(id: string) {
    return this.requestService.sendDeleteRequest(this.endpoint + '/' + id).pipe(
      map((response) => {
        this.ordersChanged.next();
        return response;
      })
    );
  }
}
