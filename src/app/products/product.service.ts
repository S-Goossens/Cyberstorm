import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { RequestService } from '../shared/services/request.service';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private endpoint = 'products';
  productsChanged = new Subject<Product[]>();
  constructor(private requestService: RequestService) {}

  // private products: Product[] = [
  //   new Product(
  //     '1',
  //     'ASUS ROG STRIX NVIDIA 3060 TI',
  //     'Newest edition of the NVIDIA series',
  //     419,
  //     'Graphics Card',
  //     'https://techpulse.be/wp-content/uploads/2020/12/ROG-STRIX-RTX3060TI-8G-GAMING_boxvgalogo-1024x1024.png'
  //   ),
  //   new Product(
  //     '2',
  //     'ASUS ROG STRIX NVIDIA 3070',
  //     'Newest edition of the NVIDIA series',
  //     419,
  //     'Graphics Card',
  //     'https://techpulse.be/wp-content/uploads/2020/12/ROG-STRIX-RTX3060TI-8G-GAMING_boxvgalogo-1024x1024.png'
  //   ),
  //   new Product(
  //     '3',
  //     'ASUS ROG STRIX NVIDIA 3080',
  //     'Newest edition of the NVIDIA series',
  //     419,
  //     'Graphics Card',
  //     'https://techpulse.be/wp-content/uploads/2020/12/ROG-STRIX-RTX3060TI-8G-GAMING_boxvgalogo-1024x1024.png'
  //   ),
  //   new Product(
  //     '1',
  //     'ASUS ROG STRIX NVIDIA 3060 TI',
  //     'Newest edition of the NVIDIA series',
  //     419,
  //     'Graphics Card',
  //     'https://techpulse.be/wp-content/uploads/2020/12/ROG-STRIX-RTX3060TI-8G-GAMING_boxvgalogo-1024x1024.png'
  //   ),
  //   new Product(
  //     '2',
  //     'ASUS ROG STRIX NVIDIA 3070',
  //     'Newest edition of the NVIDIA series',
  //     419,
  //     'Graphics Card',
  //     'https://techpulse.be/wp-content/uploads/2020/12/ROG-STRIX-RTX3060TI-8G-GAMING_boxvgalogo-1024x1024.png'
  //   ),
  //   new Product(
  //     '3',
  //     'ASUS ROG STRIX NVIDIA 3080',
  //     'Newest edition of the NVIDIA series',
  //     419,
  //     'Graphics Card',
  //     'https://techpulse.be/wp-content/uploads/2020/12/ROG-STRIX-RTX3060TI-8G-GAMING_boxvgalogo-1024x1024.png'
  //   ),
  // ];

  getProducts() {
    return this.requestService.sendGetRequest(this.endpoint).pipe(
      map((response) => {
        console.log(response);
        const productsArray: Product[] = [];
        for (const product in response['products']) {
          productsArray.push(response['products'][product]);
        }
        return productsArray;
      })
    );
  }

  getProduct(id: string) {
    return this.requestService.sendGetRequest(this.endpoint + '/' + id).pipe(
      map((response) => {
        if (response['product']) {
          return response['product'] as Product;
        }
      })
    );
  }
}
