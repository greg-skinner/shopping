import { storageMock } from '../mocks/storageMock';
import { GROCERIES_STORAGE_KEY, Groceries } from './groceries';
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
    it('can add and remove items', () => {
      const list = new ShoppingList();
      const item = new ShoppingItem('test');

      expect(list.list.length).toBe(0);

      list.addItem(item);

      expect(list.list.length).toBe(1);

      list.removeItem(item);

      expect(list.list.length).toBe(0);
    });

    it('multiples of the same item stack', () => {
      const list = new ShoppingList();
      const item = new ShoppingItem('test');
      list.addItem(item);
      list.addItem(item);

      expect(list.list.length).toBe(1);
      expect(list.list[0].quantity).toBe(2);
      expect(list.list[0].name).toBe('2 tests');

      list.removeItem(item);

      expect(list.list.length).toBe(1);
      expect(list.list[0].quantity).toBe(1);
      expect(list.list[0].name).toBe('test');
    });

    it('can clear the list', () => {
      const list = new ShoppingList();
      const item = new ShoppingItem('test');
      list.addItem(item);

      const missingItems = list.clearList();

      expect(list.list.length).toBe(0);
    });
  });

  describe('Groceries', () => {
    it('creates an empty list without storage', () => {
      global.localStorage = storageMock();
      const groceries = new Groceries();

      expect(groceries.items.length).toBe(0);
    });

    it('loads existing groceries', () => {
      const itemName = 'Test item';
      const itemPrice = 3;
      global.localStorage = storageMock({
        [GROCERIES_STORAGE_KEY]: JSON.stringify([
          { _name: itemName, price: itemPrice },
        ]),
      });

      const groceries = new Groceries();
      expect(groceries.items).toHaveLength(1);
      expect(groceries.items[0]._name).toBe(itemName);
      expect(groceries.items[0].price).toBe(itemPrice);
    });

    it('handles badly saved data without crashing', () => {
      global.localStorage = storageMock({
        [GROCERIES_STORAGE_KEY]: JSON.stringify([
          { _name: 'Item 1', price: 0 },
          { _name: 'Item 2' },
          { _name: 'Item 3', otherField: 'N/A' },
          { price: 0 },
          { bad: 'data' },
          { _name: 'Item 6', price: 0 },
        ]),
      });

      const groceries = new Groceries();
      expect(groceries.items).toHaveLength(4);
    });

    it("doesn't crash when presented with bad data", () => {
      global.localStorage = storageMock({
        [GROCERIES_STORAGE_KEY]: "[string that isn't valid json",
      });

      expect(() => new Groceries()).not.toThrow();
      const groceries = new Groceries();

      expect(groceries.items.length).toBe(0);
    });

    it('adds and saves new items', () => {
      global.localStorage = storageMock();

      const names = ['test 1', 'test 2'];
      const groceries = new Groceries();
      groceries.addItem(names[0]);
      groceries.addItem(names[1]);

      expect(groceries.items.length).toBe(2);
      expect(groceries.items[0]._name).toBe(names[0]);
      expect(groceries.items[1]._name).toBe(names[1]);

      const storage = global.localStorage.getItem(GROCERIES_STORAGE_KEY);
      expect(storage).toBeTruthy();
      expect(JSON.parse(storage!)).toHaveLength(2);
      expect(JSON.parse(storage!)[0]._name).toBe(names[0]);
      expect(JSON.parse(storage!)[1]._name).toBe(names[1]);
    });

    it('updates and saves old items', () => {
      global.localStorage = storageMock();

      const names = ['test 1', 'test 2', 'test 3'];
      const price = 22;
      const groceries = new Groceries();
      groceries.addItem(names[0]);
      groceries.addItem(names[1]);
      groceries.updateItem(names[0], names[2], price);

      expect(groceries.items.length).toBe(2);
      expect(groceries.items[0]._name).toBe(names[2]);
      expect(groceries.items[0].price).toBe(price);
      expect(
        groceries.items.find((item) => item._name === names[0])
      ).toBeFalsy();

      const storage = global.localStorage.getItem(GROCERIES_STORAGE_KEY);
      expect(storage).toBeTruthy();
      expect(JSON.parse(storage!)).toHaveLength(2);
      expect(JSON.parse(storage!)[0]._name).toBe(names[2]);
      expect(JSON.parse(storage!)[0].price).toBe(price);
      expect(
        JSON.parse(storage!).find(
          (item: { _name: string }) => item._name === names[0]
        )
      ).toBeFalsy();
    });
  });
});
