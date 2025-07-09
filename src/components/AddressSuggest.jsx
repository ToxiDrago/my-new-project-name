import React, { useEffect, useRef, useState } from 'react';

const AddressSuggest = ({ value, onChange, onValid }) => {
  const inputRef = useRef();
  const [ymapsReady, setYmapsReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!window.ymaps) {
      setError('Скрипт Яндекс.Карт не загружен!');
      return;
    }
    window.ymaps.ready(() => {
      setYmapsReady(true);
      setError('');
      const suggestView = new window.ymaps.SuggestView(inputRef.current);
      suggestView.events.add('select', (e) => {
        const address = e.get('item').value;
        onChange(address);
        window.ymaps.geocode(address, { results: 1 }).then((res) => {
          const obj = res.geoObjects.get(0);
          if (obj) {
            const country = obj.getCountry();
            if (country === 'Россия') {
              onValid(true, obj.getAddressLine());
            } else {
              onValid(false, address);
            }
          } else {
            onValid(false, address);
          }
        });
      });
    });
  }, [onChange, onValid]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Введите адрес доставки"
        autoComplete="off"
        disabled={!ymapsReady}
        style={{ background: !ymapsReady ? '#f8d7da' : undefined }}
      />
      {!ymapsReady && <div style={{ color: 'red', fontSize: 12 }}>Загрузка Яндекс.Карт...</div>}
      {error && <div style={{ color: 'red', fontSize: 12 }}>{error}</div>}
    </div>
  );
};

export default AddressSuggest;
