import { ListItem } from './listItem';
import { ShoppingItem } from './shoppingItem';

export const LIST_STORAGE_KEY = 'shopping-list';

export class ShoppingList {
  public get list() {
    return [...this._list];
  }

  private _list: ListItem[] = [];

  constructor() {
    try {
      const storedList = localStorage.getItem(LIST_STORAGE_KEY);
      if (storedList) {
        const shoppingList = JSON.parse(storedList);
        shoppingList.forEach((item: ListItem) => {
          if (item._name) {
            this._list.push(
              new ListItem(
                new ShoppingItem(item._name, item.price),
                item.quantity,
                item.purchased
              )
            );
          }
        });
      }
    } catch (e) {
      this._list = [];
    }

    this.save();
  }

  public save = () => {
    localStorage.setItem(
      LIST_STORAGE_KEY,
      JSON.stringify(
        this.list.map((item) => ({
          _name: item._name,
          price: item.price,
          quantity: item.quantity,
          purchased: item.purchased,
        }))
      )
    );
  };

  public addItem = (item: ShoppingItem) => {
    const oldItem = this._list.find((found) => found._name === item._name);

    if (oldItem) {
      oldItem.adjustQuantity(1);
    } else {
      this._list.push(new ListItem(item));
    }
    this.save();
  };

  public removeItem = (item: ShoppingItem) => {
    const oldItem = this._list.findIndex((found) => found._name === item._name);

    if (oldItem > -1) {
      this._list[oldItem].adjustQuantity(-1);
      if (this._list[oldItem].quantity === 0) {
        this._list.splice(oldItem, 1);
      }
    }

    this.save();
  };

  public cleanList = () => {
    const purchased = this._list.filter((item) => item.purchased === true);

    this._list = this._list.filter((item) => item.purchased === false);

    this.save();

    // Not currently used, but potentially handy to have.
    return purchased;
  };
}
