import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  private accountSubscription: Subscription;
  account: User;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountSubscription = this.accountService
      .getUser()
      .subscribe((result) => {
        console.log(result);
        this.account = result['user'] as User;
        console.log(this.account);
      });
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
  }
}
