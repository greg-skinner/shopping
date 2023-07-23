export class ShoppingItem {
  public get price() {
    return this._price;
  }

  constructor(
    public _name: string,
    private _price?: number
  ) {}
}
