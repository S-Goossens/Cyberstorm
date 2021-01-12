import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';

@NgModule({
  declarations: [AdminComponent, AdminAddProductComponent],
  imports: [CommonModule],
})
export class AdminModule {}
