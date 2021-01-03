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
  private productsInCart: ShoppingCartLine[] = [];

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
    this.productsInCartChanged.next(this.productsInCart.slice());
  }

  public delete(index: number) {
    this.productsInCart.splice(index, 1);
    this.productsInCartChanged.next(this.productsInCart.slice());
  }

  public getAll(): ShoppingCartLine[] {
    return this.productsInCart.slice();
  }
}
