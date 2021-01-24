import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderListItemComponent } from './order-list/order-list-item/order-list-item.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent,
    OrderListItemComponent,
    OrderDetailComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class OrdersModule {}
