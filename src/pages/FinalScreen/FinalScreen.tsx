import React from 'react';
import styles from './FinalScreen.module.css';
import Hand from '../../assets/images/hand.png';
import Button from '../../components/Button/Button';

interface FinalScreenProps {
  retry: () => void;
  amount: string;
}

const FinalScreen = ({ retry, amount }: FinalScreenProps) => (
  <div className={styles.wrapper}>
    <div className={styles.card}>
      <div className={styles['card-image-wrapper']}>
        <img className={styles['card-image']} src={Hand} alt="hand" />
      </div>
      <div className={styles['card-content-wrapper']}>
        <div>
          <h1 className={styles['card-title']}>Total score:</h1>
          <h3 className={styles['card-subtitle']}>{`${amount} earned`}</h3>
        </div>
        <Button className={styles['card-button']} onClick={retry}>Try again</Button>
      </div>
    </div>
  </div>
);

export default FinalScreen;
