import React from 'react';
import styles from './InitialScreen.module.css';
import Hand from '../../assets/images/hand.png';
import Button from '../Button/Button';

const InitialScreen = () => (
  <div className={styles.wrapper}>
    <div className={styles.card}>
      <div className={styles['card-image-wrapper']}>
        <img className={styles['card-image']} src={Hand} alt="hand" />
      </div>
      <div className={styles['card-content-wrapper']}>
        <h1 className={styles['card-title']}>
          Who wants to be
          <br />
          a millionaire?
        </h1>
        <Button className={styles['card-button']}>Start</Button>
      </div>
    </div>
  </div>
);

export default InitialScreen;
