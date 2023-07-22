import { ListItem, ShoppingItem } from './shoppingItem';

export class ShoppingList {
  public get list() {
    return [...this._list];
  }
  private _list: ListItem[] = [];

  constructor() {}

  public addItem = (item: ShoppingItem) => {
    const oldItem = this._list.find((found) => found._name === item._name);

    if (oldItem) {
      oldItem.adjustQuantity(1);
    } else {
      this._list.push(new ListItem(item));
    }
  };

  public removeItem = (item: ShoppingItem) => {
    const oldItem = this._list.findIndex((found) => found._name === item._name);

    if (oldItem > -1) {
      this._list[oldItem].adjustQuantity(-1);
      if (this._list[oldItem].quantity === 0) {
        this._list.splice(oldItem, 1);
      }
    }
  };

  public clearList = () => {
    // Not currently used, but potentially handy to have.
    const notPurchased = this._list.filter((item) => item.purchased === false);

    this._list = [];

    return notPurchased;
  };
}
