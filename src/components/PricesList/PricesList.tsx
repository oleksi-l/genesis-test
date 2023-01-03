import React from 'react';
import styles from './PricesList.module.css';
import PriceItem from '../PriceItem/PriceItem';

export type PriceItemProps = {
  id: number,
  value: string,
};

type PricesListProps = {
  options: PriceItemProps[]
  className?: string
};

const PricesList = ({ options, className }: PricesListProps) => (
  <div className={`${styles['list-wrapper']} ${className ?? ''}`}>
    {options.map((item) => (
      <PriceItem
        key={item.id}
        status="passed"
        text={item.value}
        className={styles['list-item']}
      />
    ))}
  </div>
);

PricesList.defaultProps = {
  className: '',
};

export default PricesList;
