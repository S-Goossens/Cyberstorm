import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../products/product.model';
import { ShoppingCartLine, ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  public shoppingCartLines: ShoppingCartLine[] = [];
  public subscription: Subscription;
  totalPrice: Number = 0;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartLines = this.shoppingCartService.getAll();
    this.totalPrice = this.shoppingCartService.getTotalPrice();

    this.subscription = this.shoppingCartService.productsInCartChanged.subscribe(
      (shoppingCartLines: ShoppingCartLine[]) => {
        this.shoppingCartLines = shoppingCartLines;
        this.totalPrice = shoppingCartLines.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      }
    );
  }

  onOrderClick() {
    // send order
    this.shoppingCartService.sendOrder().subscribe((result) => {
      console.log(result);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
