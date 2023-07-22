import * as React from 'react';

import styles from './home.module.scss';
import { useList } from '../../appProvider';
import { GroceryDisplay } from '@components/groceryDisplay/groceryDisplay';

export interface IHomeProps {}

export const Home: React.FC<IHomeProps> = () => {
  const { list } = useList();

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.toggle}>Shop</div>
        <span>SHOPPING LIST</span>
        <div className={styles.toggle}>Add</div>
      </div>
      <div className={styles.list}>
        {list.map((item) => (
          <GroceryDisplay key={item._name} item={item} />
        ))}
      </div>
    </div>
  );
};
