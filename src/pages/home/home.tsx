import * as React from 'react';

import { AddGrocery } from '@components/addGrocery';
import { Button } from '@components/button';
import { GroceryDisplay } from '@components/groceryDisplay';
import { ListDisplay } from '@components/listDisplay';

import { useGroceries, useList } from '../../appProvider';

import styles from './home.module.scss';
import classNames from 'classnames';

export interface IHomeProps {}

export const Home: React.FC<IHomeProps> = () => {
  const { shoppingList, cleanList } = useList();
  const { groceryList } = useGroceries();
  const [filter, setFilter] = React.useState('');
  const [editMode, setEditMode] = React.useState(false);
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
      </div>
      <div className={styles.content}>
        <div className={styles.list}>
          {!displayShopping && (
            <AddGrocery filterCount={0} onUpdate={setFilter} />
          )}
          {displayShopping &&
            shoppingList.map((item) => (
              <ListDisplay key={item.name} item={item} />
            ))}
          {!displayShopping &&
            groceryList
              .filter((item) => filter.length === 0 || item.name.match(filter))
              .map((item) => (
                <GroceryDisplay
                  key={item.name}
                  item={item}
                  editMode={editMode}
                />
              ))}
        </div>
      </div>
      <div className={styles.footer}>
        {!displayShopping && (
          <Button
            onClick={() => {
              setEditMode(!editMode);
            }}
            className={classNames(styles.toggle, styles.button)}
          >
            {!editMode ? 'Edit' : 'Done'}
          </Button>
        )}
        {displayShopping && (
          <Button
            onClick={() => {
              cleanList();
            }}
            className={classNames(styles.toggle, styles.button)}
          >
            Clean
          </Button>
        )}
      </div>
    </div>
  );
};
