import * as React from 'react';

import styles from './addGrocery.module.scss';
import { useGroceries, useList } from '../../appProvider';
import { ShoppingItem } from '@model/shoppingItem';
import { Button } from '@components/button/button';

export interface IAddGroceryProps {
  onComplete: () => void;
}

export const AddGrocery: React.FC<IAddGroceryProps> = ({
  onComplete,
  ...rest
}) => {
  const textRef = React.useRef<HTMLInputElement>(null);
  const { addGrocery } = useGroceries();
  const [error, setError] = React.useState(false);

  const doAddGrocery = () => {
    if (textRef.current?.value) {
      addGrocery(textRef.current?.value);
      onComplete();
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content} {...rest}>
        <input
          ref={textRef}
          data-testid="grocery-input"
          className={styles.input}
          onChange={() => setError(false)}
        />
        <Button
          data-testid="grocery-complete"
          className={styles.button}
          onClick={() => {
            doAddGrocery();
          }}
        >
          Done
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