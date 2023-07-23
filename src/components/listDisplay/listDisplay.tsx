import * as React from 'react';

import { Button } from '@components/button';
import { ListItem } from '@model/listItem';

import { useList } from '../../appProvider';

import styles from './listDisplay.module.scss';
import classnames from 'classnames';

export interface IListDisplayProps {
  item: ListItem;
}

export const ListDisplay: React.FC<IListDisplayProps> = ({ item, ...rest }) => {
  const { save } = useList();
  const [bought, setBought] = React.useState(item.purchased);

  const buy = () => {
    setBought(!bought);
    item.purchase(!bought);
    save();
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
