import { ShoppingItem } from './shoppingItem';

export const GROCERIES_STORAGE_KEY = 'groceries';

export class Groceries {
  public get items() {
    return [...this._items];
  }
  private _items: ShoppingItem[] = [];

  constructor() {
    try {
      const storedGroceries = localStorage.getItem(GROCERIES_STORAGE_KEY);
      if (storedGroceries) {
        const groceries = JSON.parse(storedGroceries);
        groceries.forEach((item: ShoppingItem) => {
          if (item._name) {
            this._items.push(new ShoppingItem(item._name, item.price));
          }
        });
      }
    } catch (e) {
      this._items = [];
    }
  }

  private save = () => {
    localStorage.setItem(
      GROCERIES_STORAGE_KEY,
      JSON.stringify(
        this.items.map((item) => ({ _name: item._name, price: item.price }))
      )
    );
  };

  public addItem = (name: string) => {
    this._items.push(new ShoppingItem(name));
    this.save();
  };

  public updateItem = (oldName: string, newName: string, newPrice?: number) => {
    const item = this._items.findIndex((oldItem) => oldItem._name === oldName);
    if (item > -1) {
      this._items.splice(
        item,
        1,
        new ShoppingItem(newName, newPrice || this._items[item].price)
      );
    }
    this.save();
  };
}
