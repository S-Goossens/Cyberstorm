import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss'],
})
export class AccountOrdersComponent implements OnInit, OnDestroy {
  private orderSubscription: Subscription;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.orderSubscription = this.accountService
      .getOrders()
      .subscribe((result) => {
        console.log(result);
      });
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }
}
