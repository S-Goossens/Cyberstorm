import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../products/product.model';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.products = this.shoppingCartService.getAll();

    this.subscription = this.shoppingCartService.productsInCartChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
