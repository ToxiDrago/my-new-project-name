import React from 'react';

const OrderSuccess = ({ onClose }) => (
  <div className="order-success">
    <h2>Спасибо за заказ!</h2>
    <p>Мы свяжемся с вами для подтверждения заказа.</p>
    <button className="button button--black" onClick={onClose}>
      Закрыть
    </button>
  </div>
);

export default OrderSuccess;
