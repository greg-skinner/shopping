import React from 'react';

import styles from './button.module.scss';
import classnames from 'classnames';

export interface IButtonProps {
  color?: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<React.PropsWithChildren<IButtonProps>> = ({
  className,
  color,
  disabled = false,
  onClick,
  children,
  ...rest
}) => (
  <button
    className={classnames(styles.button, className)}
    style={{ '--color': color } as React.CSSProperties}
    data-disabled={disabled}
    onClick={() => !disabled && onClick()}
    {...rest}
  >
    <div className={styles.label}>{children}</div>
  </button>
);
