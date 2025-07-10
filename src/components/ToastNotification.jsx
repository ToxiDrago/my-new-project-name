import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearMaxItemsNotification } from '../redux/slices/cartSlice';

const AUTO_HIDE_DURATION = 4000; // 4 секунды

const ToastNotification = () => {
  const { maxItemsReached } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (maxItemsReached && !visible) {
      setVisible(true);
      // Автоматически скрыть через 4 секунды
      const t = setTimeout(() => {
        setVisible(false);
        dispatch(clearMaxItemsNotification());
      }, AUTO_HIDE_DURATION);
      setTimer(t);
    }
    // Если лимит снят вручную, скрываем уведомление
    if (!maxItemsReached && visible) {
      setVisible(false);
      if (timer) clearTimeout(timer);
    }
    // Очищаем таймер при размонтировании
    return () => {
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [maxItemsReached]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 9999,
        background: '#e74c3c',
        color: '#fff',
        padding: '16px 32px',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
        fontWeight: 600,
        fontSize: 16,
        display: 'flex',
        alignItems: 'center',
        minWidth: 320,
        maxWidth: 400,
        gap: 16,
      }}>
      <span>Выбрано максимальное количество пицц. Больше заказать нельзя.</span>
      <button
        onClick={() => {
          setVisible(false);
          dispatch(clearMaxItemsNotification());
        }}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: 22,
          fontWeight: 700,
          marginLeft: 'auto',
          cursor: 'pointer',
          lineHeight: 1,
        }}
        aria-label="Закрыть уведомление">
        ×
      </button>
    </div>
  );
};

export default ToastNotification;
