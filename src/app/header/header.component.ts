import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../products/product.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public amountOfProductsInCart: number = 0;
  private subscription: Subscription;
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.amountOfProductsInCart = this.shoppingCartService.getAll().length;
    this.subscription = this.shoppingCartService.productsInCartChanged.subscribe(
      (products: Product[]) => {
        this.amountOfProductsInCart = products.length;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
