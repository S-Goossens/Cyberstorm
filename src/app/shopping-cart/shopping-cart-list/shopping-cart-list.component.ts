import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ShoppingCartLine,
  ShoppingCartService,
} from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss'],
})
export class ShoppingCartListComponent implements OnInit, OnDestroy {
  @Input() public shoppingCartLines: ShoppingCartLine[] = [];
  private subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartLines = this.shoppingCartService.getAll();

    this.subscription = this.shoppingCartService.productsInCartChanged.subscribe(
      (shoppingCartLines: ShoppingCartLine[]) => {
        this.shoppingCartLines = shoppingCartLines;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
