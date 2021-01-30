import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Order } from '../order.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit, OnDestroy {
  public orders: Order[];
  public isAdmin: boolean = false;
  private orderSubscription: Subscription;
  private orderChangedSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user) {
        this.isAdmin = user.isAdmin;
      }
    });
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
    this.userSubscription.unsubscribe();
  }
}
