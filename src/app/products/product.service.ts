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
