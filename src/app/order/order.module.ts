import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderPlaceComponent } from './order-place/order-place.component';



@NgModule({
  declarations: [OrderComponent, OrderPlaceComponent],
  imports: [
    CommonModule
  ]
})
export class OrderModule { }
