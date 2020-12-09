export class Product {
  public id: string;
  public name: string;
  public description: string;
  public price: number;
  public type: string;
  public imgPath: string;

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    type: string,
    imgPath: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.type = type;
    this.imgPath = imgPath;
  }
}
