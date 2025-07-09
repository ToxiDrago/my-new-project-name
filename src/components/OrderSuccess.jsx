import React from 'react';
import styles from './OrderSuccess.module.scss';
import pizzaIcon from '../assets/img/pizza-logo.svg';

const OrderSuccess = () => (
  <div className={styles.root}>
    <div className={styles.icon}>
      <img src={pizzaIcon} alt="Пицца" width={48} height={48} />
    </div>
    <h2 className={styles.title}>Спасибо за заказ!</h2>
    <p className={styles.desc}>Мы скоро с вами свяжемся.</p>
  </div>
);

export default OrderSuccess;
