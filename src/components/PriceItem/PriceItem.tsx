import React from 'react';
import styles from './PriceItem.module.css';
import { ReactComponent as ButtonShape } from '../../assets/images/price-shape.svg';

enum PriceItemStatus {
  INACTIVE = 'inactive',
  SELECTED = 'selected',
  PASSED = 'passed',
}

export interface MenuItemProps {
  text: string;
  status: `${PriceItemStatus}`;
  className?: string
}

const PriceItem = (props: MenuItemProps) => {
  const { status, text, className } = props;
  return (
    <div className={`${styles.button} ${className ?? ''}`}>
      <ButtonShape className={`${styles[`button-shape-${status}`]} ${styles['button-shape']}`} />
      <div
        className={`${styles['button-container']} ${styles[status ? `button-container-${status}` : '']}`}
      >
        <p className={`${styles['button-text']} ${status === PriceItemStatus.PASSED ? styles['button-text-passed'] : ''}`}>{text}</p>
      </div>
      <ButtonShape className={`${styles['button-shape-right']} ${styles[`button-shape-${status}`]} ${styles['button-shape']}`} />
    </div>
  );
};

PriceItem.defaultProps = {
  className: '',
};

export default PriceItem;
