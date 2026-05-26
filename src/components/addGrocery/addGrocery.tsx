import * as React from 'react';

import { Button } from '@components/button/button';

import { useGroceries } from '../../appProvider';

import styles from './addGrocery.module.scss';

export interface IAddGroceryProps {
  onUpdate: (match: string) => void;
  filterCount: number;
}

export const AddGrocery: React.FC<IAddGroceryProps> = ({
  onUpdate,
  filterCount,
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
      textRef.current.value = '';
      onUpdate('');
    } else {
      setError(true);
    }
  };
  console.log(textRef.current?.value);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content} {...rest}>
        <input
          ref={textRef}
          data-testid="grocery-input"
          className={styles.input}
          onChange={() => {
            onUpdate(textRef.current!.value);
            setError(false);
          }}
          placeholder="Item name"
        />
        <Button
          data-testid="grocery-complete"
          disabled={!textRef.current?.value || textRef.current?.value === ''}
          className={styles.button}
          onClick={() => {
            doAddGrocery();
          }}
        >
          Add
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
