import React from 'react';
import classNames from 'classnames';
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
  const btnCls = classNames({
    [styles.button]: true,
    [className ?? '']: className?.length,
  });
  const shapesCls = {
    [styles['button-shape']]: true,
    [styles[`button-shape-${status}`]]: true,
  };
  const btnShapeCls = classNames(shapesCls);
  const btnShapeRightCls = classNames({ ...shapesCls, [styles['button-shape-right']]: true });
  const btnContainerCls = classNames({
    [styles['button-container']]: true,
    [styles[status ? `button-container-${status}` : '']]: true,
  });
  const btnTextCls = classNames({
    [styles['button-text']]: true,
    [styles['button-text-passed']]: status === PriceItemStatus.PASSED,
  });

  return (
    <div className={btnCls}>
      <ButtonShape className={btnShapeCls} />
      <div
        className={btnContainerCls}
      >
        <p className={btnTextCls}>{text}</p>
      </div>
      <ButtonShape className={btnShapeRightCls} />
    </div>
  );
};

PriceItem.defaultProps = {
  className: '',
};

export default PriceItem;
