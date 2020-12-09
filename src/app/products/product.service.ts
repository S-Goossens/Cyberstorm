import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  private products: Product[] = [
    new Product(
      '1',
      'ASUS ROG STRIX NVIDIA 3060 TI',
      'Newest edition of the NVIDIA series',
      419,
      'Graphics Card',
      'https://techpulse.be/wp-content/uploads/2020/12/ROG-STRIX-RTX3060TI-8G-GAMING_boxvgalogo-1024x1024.png'
    ),
    new Product(
      '2',
      'ASUS ROG STRIX NVIDIA 3070',
      'Newest edition of the NVIDIA series',
      419,
      'Graphics Card',
      'https://techpulse.be/wp-content/uploads/2020/12/ROG-STRIX-RTX3060TI-8G-GAMING_boxvgalogo-1024x1024.png'
    ),
    new Product(
      '3',
      'ASUS ROG STRIX NVIDIA 3080',
      'Newest edition of the NVIDIA series',
      419,
      'Graphics Card',
      'https://techpulse.be/wp-content/uploads/2020/12/ROG-STRIX-RTX3060TI-8G-GAMING_boxvgalogo-1024x1024.png'
    ),
  ];

  getProducts() {
    return this.products.slice();
  }
}
