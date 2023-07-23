import * as React from 'react';

import { useList } from '../../appProvider';

import styles from './priceControl.module.scss';

export interface IPriceControlProps {
  editMode: boolean;
}

export const PriceControl: React.FC<IPriceControlProps> = ({ editMode }) => {
  const { shoppingList } = useList();

  const basketTotal = shoppingList.reduce<number>(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  );

  return <div className={styles.content}>£{basketTotal}</div>;
};
