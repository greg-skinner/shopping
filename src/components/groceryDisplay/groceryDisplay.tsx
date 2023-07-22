import * as React from 'react';

import styles from './groceryDisplay.module.scss';
import { useList } from '../../appProvider';
import { ShoppingItem } from '@model/shoppingItem';
import { Button } from '@components/button/button';

export interface IGroceryDisplayProps {
  item: ShoppingItem;
}

export const GroceryDisplay: React.FC<IGroceryDisplayProps> = ({
  item,
  ...rest
}) => {
  const { list, add, remove } = useList();
  const inBasket = React.useMemo(() => {
    return list.find((basket) => basket._name === item._name);
  }, [list]);

  return (
    <div className={styles.content} {...rest}>
      <div data-testid="item-count" className={styles.count}>
        {inBasket ? inBasket.quantity : '0'}
      </div>
      <div data-testid="item-label" className={styles.item}>
        {item._name}
      </div>
      <div className={styles.buttonContainer}>
        <Button
          data-testid="item-decrement"
          className={styles.button}
          onClick={() => {
            remove(item);
          }}
        >
          -
        </Button>
        <Button
          data-testid="item-increment"
          className={styles.button}
          onClick={() => {
            add(item);
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
};
