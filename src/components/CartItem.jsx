import React from 'react';

const CartItem = ({ id, name, type, size, totalPrice, totalCount, onRemove, onMinus, onPlus }) => (
  <div className="cart__item">
    <div className="cart__item-info">
      <h3>{name}</h3>
      <p>
        {type}, {size} см
      </p>
    </div>
    <div className="cart__item-count">
      <button
        onClick={onMinus}
        className="button button--outline button--circle cart__item-count-minus">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.92001 5.92001V9.00001C5.92001 9.50401 5.50401 9.92001 5.00001 9.92001C4.49601 9.92001 4.08001 9.50401 4.08001 9.00001V5.92001H1.00001C0.496006 5.92001 0.0800056 5.50401 0.0800056 5.00001C0.0800056 4.49601 0.496006 4.08001 1.00001 4.08001H4.08001V1.00001C4.08001 0.496006 4.49601 0.0800056 5.00001 0.0800056C5.50401 0.0800056 5.92001 0.496006 5.92001 1.00001V4.08001H9.00001C9.50401 4.08001 9.92001 4.49601 9.92001 5.00001C9.92001 5.50401 9.50401 5.92001 9.00001 5.92001H5.92001Z"
            fill="#EB5A1E"
          />
        </svg>
      </button>
      <b>{totalCount}</b>
      <button
        onClick={onPlus}
        className="button button--outline button--circle cart__item-count-plus">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.92001 5.92001V9.00001C5.92001 9.50401 5.50401 9.92001 5.00001 9.92001C4.49601 9.92001 4.08001 9.50401 4.08001 9.00001V5.92001H1.00001C0.496006 5.92001 0.0800056 5.50401 0.0800056 5.00001C0.0800056 4.49601 0.496006 4.08001 1.00001 4.08001H4.08001V1.00001C4.08001 0.496006 4.49601 0.0800056 5.00001 0.0800056C5.50401 0.0800056 5.92001 0.496006 5.92001 1.00001V4.08001H9.00001C9.50401 4.08001 9.92001 4.49601 9.92001 5.00001C9.92001 5.50401 9.50401 5.92001 9.00001 5.92001H5.92001Z"
            fill="#EB5A1E"
          />
        </svg>
      </button>
    </div>
    <div className="cart__item-price">
      <b>{totalPrice} ₽</b>
    </div>
    <div className="cart__item-remove">
      <button onClick={onRemove} className="button button--outline button--circle">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.92001 5.92001V9.00001C5.92001 9.50401 5.50401 9.92001 5.00001 9.92001C4.49601 9.92001 4.08001 9.50401 4.08001 9.00001V5.92001H1.00001C0.496006 5.92001 0.0800056 5.50401 0.0800056 5.00001C0.0800056 4.49601 0.496006 4.08001 1.00001 4.08001H4.08001V1.00001C4.08001 0.496006 4.49601 0.0800056 5.00001 0.0800056C5.50401 0.0800056 5.92001 0.496006 5.92001 1.00001V4.08001H9.00001C9.50401 4.08001 9.92001 4.49601 9.92001 5.00001C9.92001 5.50401 9.50401 5.92001 9.00001 5.92001H5.92001Z"
            fill="#EB5A1E"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default CartItem;
