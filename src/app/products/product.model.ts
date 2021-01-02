export class Product {
  public _id: string;
  public name: string;
  public description: string;
  public price: number;
  public type: string;
  public imgPath: string;

  constructor(
    _id: string,
    name: string,
    description: string,
    price: number,
    type: string,
    imgPath: string
  ) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.type = type;
    this.imgPath = 'http://localhost:8080/' + imgPath;
  }
}
