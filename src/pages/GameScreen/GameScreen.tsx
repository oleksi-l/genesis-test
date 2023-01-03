import React, { useState } from 'react';
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

  return (
    <div className={`${styles.wrapper} ${isMenuOpen ? styles.locked : ''}`}>
      <div className={styles['question-item-wrapper']}>
        <QuestionItem />
      </div>
      <div className={`${styles['price-list-wrapper']} ${!isMenuOpen ? styles['price-list-hidden'] : ''}`}>
        <PricesList className={styles['price-list']} options={prices} />
      </div>
      <button type="button" className={styles['mobile-menu-button']} onClick={toggleMenuOpen}>
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
