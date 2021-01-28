import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/products/product.model';
import { ProductService } from 'src/app/products/product.service';
import { Order } from '../order.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  public orderSubscription: Subscription;
  public order: Order;
  public products: Product[];
  public id: string;
  public error: string;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.orderSubscription = this.orderService
        .getOrder(this.id)
        .subscribe((response) => {
          this.order = response;
        });
    });
  }

  // getProducts() {
  //   for (const productId of this.order.orderLines) {
  //     this.productService.getProduct(String(productId)).subscribe((product) => {
  //       this.products.push(product as Product);
  //     });
  //   }
  // }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }
}
