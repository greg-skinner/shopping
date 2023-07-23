import * as React from 'react';

import { AddGrocery } from '@components/addGrocery';
import { Button } from '@components/button';
import { GroceryDisplay } from '@components/groceryDisplay';
import { ListDisplay } from '@components/listDisplay';

import { useGroceries, useList } from '../../appProvider';

import styles from './home.module.scss';

export interface IHomeProps {}

export const Home: React.FC<IHomeProps> = () => {
  const { shoppingList, cleanList } = useList();
  const { groceryList } = useGroceries();
  const [addState, setAddState] = React.useState(false);
  const [displayShopping, setDisplayShopping] = React.useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Button
          onClick={() => setDisplayShopping(!displayShopping)}
          className={styles.toggle}
        >
          {displayShopping ? 'Edit' : 'Shop'}
        </Button>
        <span>SHOPPING LIST</span>
        {!displayShopping && (
          <Button
            onClick={() => {
              setAddState(!addState);
            }}
            className={styles.toggle}
          >
            {!addState ? 'Add' : 'Cancel'}
          </Button>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.list}>
          {displayShopping &&
            shoppingList.map((item) => (
              <ListDisplay key={item._name} item={item} />
            ))}
          {!displayShopping &&
            groceryList.map((item) => (
              <GroceryDisplay key={item._name} item={item} />
            ))}
          {addState && <AddGrocery onComplete={() => setAddState(false)} />}
        </div>
      </div>
      <div className={styles.footer}>
        {!displayShopping && (
          <Button
            onClick={() => {
              setAddState(true);
            }}
            className={styles.toggle}
          >
            Add
          </Button>
        )}
        {displayShopping && (
          <Button
            onClick={() => {
              cleanList();
            }}
            className={styles.toggle}
          >
            Clean list
          </Button>
        )}
      </div>
    </div>
  );
};
