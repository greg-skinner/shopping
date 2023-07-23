import * as React from 'react';

import styles from './listDisplay.module.scss';
import { ListItem } from '@model/shoppingItem';
import { Button } from '@components/button';
import classnames from 'classnames';

export interface IListDisplayProps {
  item: ListItem;
}

export const ListDisplay: React.FC<IListDisplayProps> = ({ item, ...rest }) => {
  const [bought, setBought] = React.useState(item.purchased);

  const buy = () => {
    setBought(!bought);
    item.purchase(!bought);
  };

  return (
    <div
      data-testid="item-content"
      className={classnames(styles.content, { [styles.bought]: bought })}
      {...rest}
    >
      <div className={styles.item}>{item.name}</div>
      <div className={styles.buttonContainer}>
        <Button
          data-testid="item-buy"
          className={styles.button}
          onClick={() => {
            buy();
          }}
        >
          {!bought ? 'Bought' : 'Undo'}
        </Button>
      </div>
    </div>
  );
};
