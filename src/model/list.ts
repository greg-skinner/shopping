import { ListItem, ShoppingItem } from './shoppingItem';

export class ShoppingList {
  public get list() {
    return [...this._list];
  }
  private _list: ListItem[] = [];

  constructor() {}

  public addItem = (item: ShoppingItem) => {
    const oldItem = this._list.find((found) => found.name === item._name);

    if (oldItem) {
      oldItem.adjustQuantity(1);
    } else {
      this._list.push(new ListItem(item));
    }
  };

  public clearList = () => {
    // Not currently used, but potentially handy to have.
    const notPurchased = this._list.filter((item) => item.purchased === false);

    this._list = [];

    return notPurchased;
  };
}
