import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Order } from '../../order.model';
import { OrderService } from '../../order.service';

@Component({
  selector: '[app-order-list-item]',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss'],
})
export class OrderListItemComponent implements OnInit {
  @Input() order: Order;
  @Input() isAdmin = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  public onStatusUpdate(): void {
    // update order
    this.orderService
      .updateOrder(this.order._id, this.order.totalPrice, this.order.status)
      .subscribe((response) => {
        console.log(response);
      });
  }

  public onDelete(): void {
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
