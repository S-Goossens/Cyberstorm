import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private productSubscription: Subscription;
  product: Product;
  id: string;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.productSubscription = this.productService
        .getProduct(this.id)
        .subscribe((response) => {
          this.product = response;
        });
    });
  }

  public onAddToCart() {
    this.shoppingCartService.add(this.product);
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}
