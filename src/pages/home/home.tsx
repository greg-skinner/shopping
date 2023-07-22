import * as React from 'react';

import styles from './home.module.scss';
import { useGroceries, useList } from '../../appProvider';
import { GroceryDisplay } from '@components/groceryDisplay';
import { Button } from '@components/button';
import { AddGrocery } from '@components/addGrocery';

export interface IHomeProps {}

export const Home: React.FC<IHomeProps> = () => {
  const { shoppingList } = useList();
  const { groceryList } = useGroceries();
  const [addState, setAddState] = React.useState(false);
  const [displayShopping, setDisplayShopping] = React.useState(false);

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <Button
          onClick={() => setDisplayShopping(!displayShopping)}
          className={styles.toggle}
        >
          {displayShopping ? 'Edit' : 'Shop'}
        </Button>
        <span>SHOPPING LIST</span>
        <Button
          onClick={() => {
            setAddState(true);
          }}
          className={styles.toggle}
        >
          Add
        </Button>
      </div>
      <div className={styles.list}>
        {displayShopping &&
          shoppingList.map((item) => (
            <GroceryDisplay key={item._name} item={item} />
          ))}
        {!displayShopping &&
          groceryList.map((item) => (
            <GroceryDisplay key={item._name} item={item} />
          ))}
        {addState && <AddGrocery onComplete={() => setAddState(false)} />}
      </div>
    </div>
  );
};
