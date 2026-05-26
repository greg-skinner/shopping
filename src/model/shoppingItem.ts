export class ShoppingItem {
  public get price() {
    return this._price;
  }

  public get name() {
    return this._name;
  }

  constructor(
    public _name: string,
    private _price = 0
  ) {}
}
