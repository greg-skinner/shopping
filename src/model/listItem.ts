import { ShoppingItem } from './shoppingItem';

export class ListItem extends ShoppingItem {
  public get purchased() {
    return this._purchased;
  }

  public get quantity() {
    return this._quantity;
  }

  public get name() {
    if (this._quantity === 1) {
      return this._name;
    }

    return `${this._quantity} ${this._name}s`;
  }

  constructor(
    item: ShoppingItem,
    private _quantity = 1,
    private _purchased = false
  ) {
    super(item._name, item.price);
  }

  public purchase = (purchased: boolean) => {
    this._purchased = purchased;

    return this._purchased;
  };

  public adjustQuantity = (amount: number) => {
    this._quantity += amount;

    return this._quantity;
  };
}
