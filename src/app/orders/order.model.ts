import { Address } from '../auth/address.model';
import { Product } from '../products/product.model';

export class Order {
  public _id: string;
  public orderLines: OrderLine[];
  public userId: string;
  public address: Address;
  public totalPrice: number;
  public status: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    _id: string,
    orderLines: OrderLine[],
    userId: string,
    address: Address,
    totalPrice: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this._id = _id;
    this.orderLines = orderLines;
    this.userId = userId;
    this.address = address;
    this.totalPrice = totalPrice;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class OrderLine {
  constructor(public product: Product, public quantity: number) {}
}
