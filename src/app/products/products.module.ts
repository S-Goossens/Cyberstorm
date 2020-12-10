import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductThumbnailComponent,
    ProductDetailComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
})
export class ProductsModule {}
