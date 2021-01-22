import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  public id: string;
  public editMode: boolean = false;
  public error: string = null;
  public loading: boolean = false;

  public product: Product;
  private productSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (params['id'] != null || params['id'] != undefined) {
        this.editMode = true;
        this.loading = true;
        this.productSubscription = this.productService
          .getProduct(this.id)
          .subscribe((product) => {
            this.product = product;
            console.log(this.product);
            this.loading = false;
          });
      }
    });
  }

  onSubmit(form: NgForm) {
    if (this.editMode) {
      this.productService
        .updateProduct(
          this.id,
          form.value['name'],
          form.value['imgPath'],
          form.value['description'],
          form.value['price'],
          form.value['type']
        )
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['/']);
        });
    } else {
      this.productService
        .saveProduct(
          form.value['name'],
          form.value['imgPath'],
          form.value['description'],
          form.value['price'],
          form.value['type']
        )
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['/']);
        });
    }
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
