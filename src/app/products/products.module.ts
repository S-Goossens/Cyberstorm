import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductThumbnailComponent,
    ProductDetailComponent,
    ProductEditComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AppRoutingModule],
  exports: [ProductEditComponent],
})
export class ProductsModule {}
