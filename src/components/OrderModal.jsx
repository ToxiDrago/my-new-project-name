import React, { useState } from 'react';
import AddressSuggest from './AddressSuggest';

const OrderModal = ({ visible, onClose, onSubmit, loading, error, orderData, handleInput }) => {
  const [addressValid, setAddressValid] = useState(true);

  if (!visible) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal__title">Оформление заказа</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          <input
            className="modal__input"
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={orderData.name}
            onChange={handleInput}
            required
          />
          <input
            className="modal__input"
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={orderData.phone}
            onChange={handleInput}
            required
          />
          <AddressSuggest
            value={orderData.address}
            onChange={(val) => handleInput({ target: { name: 'address', value: val } })}
            onValid={(valid, val) => setAddressValid(valid)}
          />
          {!addressValid && <div className="modal__error">Введите корректный адрес в России</div>}
          <button
            className="modal__btn"
            type="submit"
            disabled={loading || !orderData.address.trim() || !addressValid}>
            {loading ? 'Отправка...' : 'Оформить заказ'}
          </button>
          {error && <div className="modal__error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
