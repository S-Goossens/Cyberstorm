import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/product.model';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss'],
})
export class ShoppingCartListComponent implements OnInit, OnDestroy {
  @Input() public products: Product[] = [];
  private subscription: Subscription;

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
