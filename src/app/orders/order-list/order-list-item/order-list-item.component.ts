import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../order.model';
import { OrderService } from '../../order.service';

@Component({
  selector: '[app-order-list-item]',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss'],
})
export class OrderListItemComponent implements OnInit {
  @Input() order: Order;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  onStatusUpdate() {
    // update order
    this.orderService
      .updateOrder(this.order._id, this.order.totalPrice, this.order.status)
      .subscribe((response) => {
        console.log(response);
      });
  }

  onDelete() {
    this.orderService.deleteOrder(this.order._id).subscribe(
      (response) => {
        //display message
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
