import React from 'react';

const OrderModal = ({ visible, onClose, onSubmit, loading, error, orderData, handleInput }) => {
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
          <input
            className="modal__input"
            type="text"
            name="address"
            placeholder="Адрес доставки"
            value={orderData.address}
            onChange={handleInput}
            required
          />
          <button
            className="modal__btn"
            type="submit"
            disabled={loading || !orderData.address.trim()}>
            {loading ? 'Отправка...' : 'Оформить заказ'}
          </button>
          {error && <div className="modal__error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
