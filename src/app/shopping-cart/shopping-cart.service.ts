import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Product } from '../products/product.model';
import { RequestService } from '../shared/services/request.service';

export class ShoppingCartLine {
  constructor(public product: Product, public quantity: number) {}
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  public productsInCartChanged: Subject<ShoppingCartLine[]> = new Subject<
    ShoppingCartLine[]
  >();
  public totalPriceChanged: Subject<Number> = new Subject<Number>();
  private productsInCart: ShoppingCartLine[] = [];
  private totalPrice: Number = 0;

  constructor(
    private authService: AuthService,
    private requestService: RequestService,
    private router: Router
  ) {}

  public add(product: Product) {
    let existingProduct: number;
    if (this.productsInCart.length > 0) {
      existingProduct = this.productsInCart.findIndex(
        (p) => p.product._id === product._id
      );
    }
    if (existingProduct >= 0) {
      this.productsInCart[existingProduct].quantity += 1;
    } else {
      const newLine = new ShoppingCartLine(product, 1);
      this.productsInCart.push(newLine);
    }
    this.updateCart();
  }

  public updateCart() {
    this.updateTotalPrice();
    this.productsInCartChanged.next(this.productsInCart.slice());
    this.totalPriceChanged.next(this.totalPrice);
  }

  public delete(index: number) {
    this.productsInCart.splice(index, 1);
    this.updateCart();
  }

  public getAll(): ShoppingCartLine[] {
    return this.productsInCart.slice();
  }

  public getTotalPrice(): Number {
    return this.totalPrice;
  }

  public sendOrder() {
    const user = this.authService.getUser();

    if (user) {
      return this.requestService
        .sendPostRequest('orders', {
          address: user.address._id,
          cart: JSON.stringify(this.productsInCart),
          totalPrice: this.totalPrice,
        })
        .subscribe((result) => {
          if (result) {
            this.emptyCart();
            return true;
          }
        });
    } else {
      this.router.navigate(['/auth']);
    }
  }

  emptyCart() {
    this.productsInCart = [];
    this.totalPrice = 0;
    this.updateCart();
  }

  updateTotalPrice() {
    this.totalPrice = this.productsInCart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}
