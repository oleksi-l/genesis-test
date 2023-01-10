import React from 'react';
import Button from '../Button/Button';
import styles from './FallbackComponent.module.css';

interface FallbackComponentProps {
  error: string;
}

const FallbackComponent = ({
  error,
}: FallbackComponentProps) => (
  <div role="alert" className={styles.container}>
    <h1>Something went wrong:</h1>
    <p>{error}</p>
    <Button className={styles['fallback-button']}>Try again</Button>
  </div>
);

export default FallbackComponent;
