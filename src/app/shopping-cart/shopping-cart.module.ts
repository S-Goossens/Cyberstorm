import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartListComponent } from './shopping-cart-list/shopping-cart-list.component';
import { ShoppingCartListItemComponent } from './shopping-cart-list/shopping-cart-list-item/shopping-cart-list-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    ShoppingCartListComponent,
    ShoppingCartListItemComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class ShoppingCartModule {}
