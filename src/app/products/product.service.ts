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
          console.log(response['product']);
          return response['product'] as Product;
        }
      })
    );
  }

  saveProduct(
    name: string,
    imgPath: string,
    description: string,
    price: number,
    type: string
  ) {
    return this.requestService
      .sendPostRequest(this.endpoint, {
        name: name,
        imgPath: imgPath,
        description: description,
        price: price,
        type: type,
      })
      .pipe(
        map((response) => {
          if (response['product']) {
            console.log(response['product']);
            return response['product'] as Product;
          }
        })
      );
  }

  updateProduct(
    id: string,
    name: string,
    imgPath: string,
    description: string,
    price: number,
    type: string
  ) {
    return this.requestService
      .sendPutRequest(this.endpoint + '/' + id, {
        name: name,
        imgPath: imgPath,
        description: description,
        price: price,
        type: type,
      })
      .pipe(
        map((response) => {
          if (response['product']) {
            console.log(response['product']);
            return response['product'] as Product;
          }
        })
      );
  }
}
