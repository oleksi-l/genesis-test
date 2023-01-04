import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './GameScreen.module.css';
import QuestionItem from '../../components/QuestionItem/QuestionItem';
import PricesList from '../../components/PricesList/PricesList';
import prices from '../../constants/prices';
import HamburgerIcon from '../../assets/images/hamburger-button.svg';
import CloseButton from '../../assets/images/close-button.svg';

const GameScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };
  const priceListWrapperCls = classNames({
    [styles['price-list-hidden']]: !isMenuOpen,
    [styles['price-list-wrapper']]: true,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles['question-item-wrapper']}>
        <QuestionItem />
      </div>
      <div
        className={priceListWrapperCls}
      >
        <PricesList className={styles['price-list']} options={prices} />
      </div>
      <button
        type="button"
        className={styles['mobile-menu-button']}
        onClick={toggleMenuOpen}
      >
        {!isMenuOpen ? (
          <img
            src={HamburgerIcon}
            className={styles['hamburger-button']}
            alt="show mobile menu button"
          />
        ) : (
          <img
            src={CloseButton}
            className={styles['close-button']}
            alt="close mobile menu button"
          />
        )}
      </button>
    </div>
  );
};

export default GameScreen;
