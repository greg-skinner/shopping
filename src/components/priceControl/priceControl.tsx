import * as React from 'react';

import { useList } from '../../appProvider';

import styles from './priceControl.module.scss';
import classnames from 'classnames';

export interface IPriceControlProps {
  editMode: boolean;
}

export const PRICECAP_STORAGE_KEY = 'max-price';

export const PriceControl: React.FC<IPriceControlProps> = ({ editMode }) => {
  const { shoppingList } = useList();
  const priceRef = React.useRef<HTMLInputElement>(null);
  const [priceCap, setPriceCap] = React.useState<number>();

  React.useEffect(() => {
    const findPrice = localStorage.getItem(PRICECAP_STORAGE_KEY);
    try {
      if (findPrice && !Number.isNaN(parseInt(findPrice!, 10))) {
        setPriceCap(parseInt(findPrice!, 10));
      }
    } catch (e) {
      // NOP
    }
  });

  const update = () => {
    const findPrice = priceRef.current?.value;
    try {
      if (findPrice && !Number.isNaN(parseInt(findPrice!, 10))) {
        setPriceCap(parseInt(findPrice!, 10));
        localStorage.setItem(PRICECAP_STORAGE_KEY, findPrice);
      }
    } catch (e) {
      // NOP
    }
  };

  const basketTotal = shoppingList.reduce<number>(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  );

  return (
    <div
      className={classnames(styles.price, {
        [styles.warn]: priceCap !== undefined && basketTotal > priceCap,
      })}
    >
      £{basketTotal}
      {!editMode && priceCap !== undefined && ` / £${priceCap}`}
      {editMode && (
        <>
          <div className={styles.divider}>/</div>
          <input
            ref={priceRef}
            type="number"
            placeholder="Maxiumum"
            className={styles.input}
            defaultValue={priceCap}
            onChange={update}
          ></input>
        </>
      )}
    </div>
  );
};
