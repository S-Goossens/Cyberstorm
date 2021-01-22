import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  private productSubscription: Subscription;
  public products: Product[];
  public isAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productSubscription = this.productService
      .getProducts()
      .subscribe((response) => {
        this.products = response;
        console.log(this.products);
      });
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}
