import { ShoppingList } from '@model/list';
import { ListItem, ShoppingItem } from '@model/shoppingItem';
import * as React from 'react';

export interface AppState {
  list: ListItem[];
  add: (item: ShoppingItem) => void;
  remove: (item: ShoppingItem) => void;
}

export const AppContext = React.createContext<AppState>({
  list: [],
  add: (item: ShoppingItem) => {},
  remove: (item: ShoppingItem) => {},
});

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [state, setState] = React.useState(false);
  const [shoppingList] = React.useState(new ShoppingList());

  const list = React.useMemo(() => shoppingList.list, [state]);

  const add = (item: ShoppingItem) => {
    shoppingList.addItem(item);
    setState(!state);
  };

  const remove = (item: ShoppingItem) => {
    shoppingList.removeItem(item);
    setState(!state);
  };

  return (
    <AppContext.Provider
      value={{
        list,
        add,
        remove,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useList = () => {
  const { list, add, remove } = React.useContext(AppContext);

  return { list, add, remove };
};
