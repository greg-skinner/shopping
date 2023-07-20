import { ShoppingList } from './list';
import { ListItem, ShoppingItem } from './shoppingItem';

describe('Item', () => {
  describe('Shopping item', () => {
    it('has a name and a price', () => {
      const newItem = new ShoppingItem('test', 1);

      expect(newItem._name).toBe('test');
      expect(newItem.price).toBe(1);
    });
  });

  describe('List item', () => {
    it('creates from a shopping item', () => {
      const storageItem = new ShoppingItem('test', 1);
      const listItem = new ListItem(storageItem);

      expect(listItem.name).toBe(storageItem._name);
      expect(listItem.price).toBe(storageItem.price);
    });

    it('creates in a default state', () => {
      const storageItem = new ShoppingItem('test', 1);
      const listItem = new ListItem(storageItem);

      expect(listItem.quantity).toBe(1);
      expect(listItem.purchased).toBe(false);
    });

    it('marks purchased items as purchased', () => {
      const storageItem = new ShoppingItem('test', 1);
      const listItem = new ListItem(storageItem);
      listItem.purchase(true);

      expect(listItem.purchased).toBe(true);
    });

    it('localises multiple items a little bit', () => {
      const storageItem = new ShoppingItem('test', 1);
      const listItem = new ListItem(storageItem);
      listItem.adjustQuantity(3);

      expect(listItem.name).toBe('4 tests');
    });
  });

  describe('List', () => {
    it('can add a new item', () => {
      const list = new ShoppingList();
      const item = new ShoppingItem('test');

      expect(list.list.length).toBe(0);

      list.addItem(item);

      expect(list.list.length).toBe(1);
    });

    it('multiples of the same item stack', () => {
      const list = new ShoppingList();
      const item = new ShoppingItem('test');
      list.addItem(item);
      list.addItem(item);

      expect(list.list.length).toBe(1);
      expect(list.list[0].name).toBe('2 tests');
    });

    it('can clear the list', () => {
      const list = new ShoppingList();
      const item = new ShoppingItem('test');
      list.addItem(item);

      const missingItems = list.clearList();

      expect(list.list.length).toBe(0);
    });
  });
});
