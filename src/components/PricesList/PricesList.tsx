import React from 'react';
import classNames from 'classnames';
import styles from './PricesList.module.css';
import PriceItem from '../PriceItem/PriceItem';

export type PriceItemProps = {
  id: number;
  value: string;
};

type PricesListProps = {
  options: PriceItemProps[];
  className?: string;
};

const PricesList = ({ options, className }: PricesListProps) => {
  const wrapperCls = classNames({
    [styles['list-wrapper']]: true,
    [className ?? '']: className?.length,
  });

  return (
    <div className={wrapperCls}>
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
};

PricesList.defaultProps = {
  className: '',
};

export default PricesList;
