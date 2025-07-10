import React from 'react';
import CartItem from '../components/CartItem';
import CartEmpty from '../components/CartEmpty';

const Cart = ({ items, totalPrice, onRemove, onMinus, onPlus, onClear }) => {
  if (!items.length) {
    return <CartEmpty />;
  }

  return (
    <div className="cart">
      <div className="cart__top">
        <h2 className="content__title">Корзина</h2>
        <button className="cart__clear" onClick={onClear}>
          <span>Очистить корзину</span>
        </button>
      </div>
      <div className="content__items">
        {items.map((item) => (
          <CartItem
            key={`${item.id}_${item.type}_${item.size}`}
            {...item}
            onRemove={() => onRemove(item)}
            onMinus={() => onMinus(item)}
            onPlus={() => onPlus(item)}
          />
        ))}
      </div>
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span>
            Всего пицц: <b>{items.reduce((sum, item) => sum + item.totalCount, 0)}</b>
          </span>
          <span>
            Сумма заказа: <b>{totalPrice} ₽</b>
          </span>
        </div>
        <div className="cart__bottom-buttons">
          <button className="button button--outline button--add go-back-btn">
            <span>Вернуться назад</span>
          </button>
          <button className="button pay-btn">
            <span>Оплатить сейчас</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
