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
