import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../products/product.model';

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

  constructor() {}

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

  updateTotalPrice() {
    this.totalPrice = this.productsInCart.reduce(
      (sum, item) => sum + item.product.price,
      0
    );
  }
}
