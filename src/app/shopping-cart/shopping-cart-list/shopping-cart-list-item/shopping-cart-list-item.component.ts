import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product.model';
import {
  ShoppingCartLine,
  ShoppingCartService,
} from '../../shopping-cart.service';

@Component({
  selector: '[app-shopping-cart-list-item]',
  templateUrl: './shopping-cart-list-item.component.html',
  styleUrls: ['./shopping-cart-list-item.component.scss'],
})
export class ShoppingCartListItemComponent implements OnInit {
  @Input() public shoppingCartLine: ShoppingCartLine;
  @Input() public index: number;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}

  onQuantityChange() {
    if (this.shoppingCartLine.quantity === 0) {
      this.removeFromCart();
    }
    this.shoppingCartService.updateCart();
  }

  public removeFromCart() {
    this.shoppingCartService.delete(this.index);
  }
}
