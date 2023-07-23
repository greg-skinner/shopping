import * as React from 'react';

import { Button } from '@components/button/button';
import { ShoppingItem } from '@model/shoppingItem';

import { useGroceries, useList } from '../../appProvider';

import styles from './groceryDisplay.module.scss';

export interface IGroceryDisplayProps {
  item: ShoppingItem;
  editMode: boolean;
}

export const GroceryDisplay: React.FC<IGroceryDisplayProps> = ({
  item,
  editMode,
  ...rest
}) => {
  const { updateGrocery } = useGroceries();
  const textRef = React.useRef<HTMLInputElement>(null);
  const priceRef = React.useRef<HTMLInputElement>(null);
  const [throttle, setThrottle] = React.useState<NodeJS.Timeout>();
  const [error, setError] = React.useState(false);
  const { shoppingList, addShopping, removeShopping } = useList();

  const inBasket = React.useMemo(
    () => shoppingList.find((basket) => basket._name === item._name),
    [shoppingList]
  );

  const update = React.useCallback(() => {
    setError(false);

    if (throttle) {
      clearTimeout(throttle);
    }
    setThrottle(
      setTimeout(() => {
        if (textRef.current?.value && textRef.current?.value !== '') {
          updateGrocery(
            item._name,
            textRef.current?.value,
            priceRef.current?.value
              ? parseInt(priceRef.current?.value, 10)
              : undefined
          );
        } else {
          setError(true);
        }
      }, 100)
    );
  }, [throttle]);

  return (
    <div className={styles.content} {...rest}>
      <div data-testid="item-count" className={styles.count}>
        {inBasket ? inBasket.quantity : '0'}
      </div>
      {!editMode && (
        <div data-testid="item-label" className={styles.item}>
          {item._name}
        </div>
      )}
      {editMode && (
        <input
          ref={textRef}
          data-testid="grocery-input"
          className={styles.input}
          onChange={update}
          placeholder="Item name"
          defaultValue={item._name}
        />
      )}
      {!editMode && (
        <div data-testid="item-price" className={styles.price}>
          £{item.price}
        </div>
      )}
      {editMode && (
        <input
          type="number"
          ref={priceRef}
          data-testid="grocery-price"
          className={styles.price}
          onChange={update}
          placeholder="Price"
          defaultValue={item.price}
        />
      )}
      <div className={styles.buttonContainer}>
        <Button
          data-testid="item-decrement"
          className={styles.button}
          onClick={() => {
            removeShopping(item);
          }}
        >
          -
        </Button>
        <Button
          data-testid="item-increment"
          className={styles.button}
          onClick={() => {
            addShopping(item);
          }}
        >
          +
        </Button>
      </div>
      {error && (
        <div data-testid="grocery-error" className={styles.error}>
          No grocery name
        </div>
      )}
    </div>
  );
};
