import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.scss'],
})
export class AdminAddProductComponent implements OnInit {
  productForm: FormGroup;
  constructor() {}

  ngOnInit(): void {}

  initForm() {}
}
