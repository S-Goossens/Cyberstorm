import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: '[app-product-thumbnail]',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductThumbnailComponent implements OnInit {
  @Input() product: Product;

  constructor() {}

  ngOnInit(): void {}
}
