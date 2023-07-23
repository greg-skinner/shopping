import * as React from 'react';

import { Button } from '@components/button/button';

import { useGroceries } from '../../appProvider';

import styles from './addGrocery.module.scss';

export interface IAddGroceryProps {
  onComplete: () => void;
}

export const AddGrocery: React.FC<IAddGroceryProps> = ({
  onComplete,
  ...rest
}) => {
  const textRef = React.useRef<HTMLInputElement>(null);
  const priceRef = React.useRef<HTMLInputElement>(null);
  const { addGrocery } = useGroceries();
  const [error, setError] = React.useState(false);

  const doAddGrocery = () => {
    if (textRef.current?.value) {
      addGrocery(
        textRef.current?.value,
        priceRef.current?.value
          ? parseInt(priceRef.current?.value, 10)
          : undefined
      );
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
          placeholder="Item name"
        />
        <input
          type="number"
          ref={priceRef}
          data-testid="grocery-price"
          className={styles.price}
          onChange={() => setError(false)}
          placeholder="Price"
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
