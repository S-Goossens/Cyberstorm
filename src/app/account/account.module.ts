import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountOrdersComponent } from './account-orders/account-orders.component';



@NgModule({
  declarations: [AccountComponent, AccountOrdersComponent],
  imports: [
    CommonModule
  ]
})
export class AccountModule { }
