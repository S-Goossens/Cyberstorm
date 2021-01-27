import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../order.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit, OnDestroy {
  public orders: Order[];
  private orderSubscription: Subscription;
  private orderChangedSubscription: Subscription;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderSubscription = this.orderService
      .getOrders()
      .subscribe((response) => {
        this.orders = response;
      });

    this.orderChangedSubscription = this.orderService.ordersChanged.subscribe(
      (_) => {
        this.orderSubscription = this.orderService
          .getOrders()
          .subscribe((response) => {
            this.orders = response;
          });
      }
    );
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
    this.orderChangedSubscription.unsubscribe();
  }
}
