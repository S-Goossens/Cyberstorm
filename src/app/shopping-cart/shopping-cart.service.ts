import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../products/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  public productsInCartChanged: Subject<Product[]> = new Subject<Product[]>();
  private productsInCart: Product[] = [
    new Product(
      '2',
      'ASUS ROG STRIX NVIDIA 3070',
      'Newest edition of the NVIDIA series',
      419,
      'Graphics Card',
      'https://techpulse.be/wp-content/uploads/2020/12/ROG-STRIX-RTX3060TI-8G-GAMING_boxvgalogo-1024x1024.png'
    ),
  ];

  constructor() {}

  public add(product: Product) {
    this.productsInCart.push(product);
    this.productsInCartChanged.next(this.productsInCart.slice());
  }

  public delete(index: number) {}

  public getAll(): Product[] {
    return this.productsInCart.slice();
  }
}
