import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
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
  public product: Product;
  public id: string;
  public isAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
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

    this.isAdmin = this.authService.isAdmin();
  }

  public onAddToCart() {
    this.shoppingCartService.add(this.product);
  }

  public onDelete() {
    if (this.isAdmin) {
      // delete product
      this.productService.deleteProduct(this.id).subscribe(
        (response) => {
          this.router.navigate(['/products']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}
