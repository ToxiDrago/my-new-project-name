import React, { useState } from 'react';

const OrderModal = ({ isOpen, onClose, onSubmit, cart, totalPrice }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    onSubmit({ name, phone, address });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Оформление заказа</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Адрес доставки"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {error && <div className="modal-error">{error}</div>}
          <div className="modal-summary">
            <span>
              Всего: {cart.length} пицц на {totalPrice} ₽
            </span>
          </div>
          <button type="submit" className="button button--black">
            Заказать
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
