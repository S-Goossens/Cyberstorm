import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Product } from '../products/product.model';
import {
  ShoppingCartLine,
  ShoppingCartService,
} from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public amountOfProductsInCart: number = 0;
  isAuthenticated = false;
  private userSubscription: Subscription;
  private shoppingCartSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.amountOfProductsInCart = this.shoppingCartService.getAll().length;
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    this.shoppingCartSubscription = this.shoppingCartService.productsInCartChanged.subscribe(
      (products: ShoppingCartLine[]) => {
        this.amountOfProductsInCart = products.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.shoppingCartSubscription.unsubscribe();
  }
}
