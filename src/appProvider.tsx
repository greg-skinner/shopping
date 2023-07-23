import * as React from 'react';

import { Groceries } from '@model/groceries';
import { ShoppingList } from '@model/list';
import { ListItem } from '@model/listItem';
import { ShoppingItem } from '@model/shoppingItem';

export interface AppState {
  groceries: {
    groceryList: ShoppingItem[];
    addGrocery: (name: string) => void;
    updateGrocery: (
      oldName: string,
      newName: string,
      newPrice?: number
    ) => void;
  };
  list: {
    shoppingList: ListItem[];
    addShopping: (item: ShoppingItem) => void;
    removeShopping: (item: ShoppingItem) => void;
    cleanList: () => void;
    save: () => void;
  };
}

/* eslint-disable @typescript-eslint/no-unused-vars -- Empty context */
/* eslint-disable no-empty-function -- Empty context */
export const emptyContext = {
  groceries: {
    groceryList: [],
    addGrocery: (name: string) => {},
    updateGrocery: (oldName: string, newName: string, newPrice?: number) => {},
  },
  list: {
    shoppingList: [],
    addShopping: (item: ShoppingItem) => {},
    removeShopping: (item: ShoppingItem) => {},
    cleanList: () => {},
    save: () => {},
  },
};
/* eslint-enable @typescript-eslint/no-unused-vars -- End empty context */
/* eslint-enable no-empty-function -- End empty context */

export const AppContext = React.createContext<AppState>(emptyContext);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [state, setState] = React.useState(false);
  const [shoppingStore] = React.useState(new ShoppingList());
  const [groceryStore] = React.useState(new Groceries());

  const shoppingList = React.useMemo(() => shoppingStore.list, [state]);
  const groceryList = React.useMemo(() => groceryStore.items, [state]);

  const addShopping = (item: ShoppingItem) => {
    shoppingStore.addItem(item);
    setState(!state);
  };

  const removeShopping = (item: ShoppingItem) => {
    shoppingStore.removeItem(item);
    setState(!state);
  };

  const cleanList = () => {
    shoppingStore.cleanList();
    setState(!state);
  };

  const addGrocery = (name: string) => {
    groceryStore.addItem(name);
    setState(!state);
  };

  const updateGrocery = (
    oldName: string,
    newName: string,
    newPrice?: number
  ) => {
    groceryStore.updateItem(oldName, newName, newPrice);
    setState(!state);
  };

  return (
    <AppContext.Provider
      value={{
        groceries: { groceryList, addGrocery, updateGrocery },
        list: {
          shoppingList,
          addShopping,
          removeShopping,
          cleanList,
          save: shoppingStore.save,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useList = () => {
  const { list } = React.useContext(AppContext);

  return list;
};

export const useGroceries = () => {
  const { groceries } = React.useContext(AppContext);

  return groceries;
};
