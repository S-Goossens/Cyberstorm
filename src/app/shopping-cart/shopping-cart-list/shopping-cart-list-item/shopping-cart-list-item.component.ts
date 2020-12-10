import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product.model';

@Component({
  selector: 'app-shopping-cart-list-item',
  templateUrl: './shopping-cart-list-item.component.html',
  styleUrls: ['./shopping-cart-list-item.component.scss'],
})
export class ShoppingCartListItemComponent implements OnInit {
  @Input() public product: Product;
  @Input() public index: number;

  constructor() {}

  ngOnInit(): void {}

  public removeFromCart() {
    console.log('verwijder');
  }
}
