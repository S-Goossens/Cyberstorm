import { Component, OnInit } from '@angular/core';
import { Order } from '../order.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  public orders: Order[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((response) => {
      console.log(response);
      this.orders = response;
    });
  }
}
