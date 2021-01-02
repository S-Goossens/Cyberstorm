import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  private productSubscription: Subscription;
  products: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productSubscription = this.productService
      .getProducts()
      .subscribe((response) => {
        this.products = response;
        console.log(this.products);
      });
  }
}
