export class Address {
  constructor(
    public street: string,
    public number: string,
    public postalCode: string,
    public city: string,
    public region: string,
    public country: string,
    public _id: string = null
  ) {}
}
