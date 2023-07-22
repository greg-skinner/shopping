import { ShoppingItem } from './shoppingItem';

const GROCERIES_STORAGE_KEY = 'groceries';

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
        groceries.map((item: ShoppingItem) =>
          this._items.push(new ShoppingItem(item._name, item.price))
        );
      }
    } catch (e) {
      this._items = [];
    }
  }

  private save = () => {
    localStorage.setItem(GROCERIES_STORAGE_KEY, JSON.stringify(this.items));
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
