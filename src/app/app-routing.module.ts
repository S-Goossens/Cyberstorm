import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { HomeComponent } from './home/home.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: '', component: ProductListComponent },
      {
        path: 'new',
        canActivate: [RoleGuard],
        component: ProductEditComponent,
      },
      {
        path: ':id',
        component: ProductDetailComponent,
      },
      {
        path: 'edit/:id',
        canActivate: [RoleGuard],
        component: ProductEditComponent,
      },
    ],
  },
  {
    path: 'orders',
    canActivate: [RoleGuard],
    component: OrdersComponent,
    children: [
      { path: '', component: OrderListComponent },
      { path: ':id', component: OrderDetailComponent },
    ],
  },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'auth', component: AuthComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
