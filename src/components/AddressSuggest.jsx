import React, { useState, useRef } from 'react';

const DADATA_API_KEY = 'a6e5199964dfc081e9dab106ba82157004f7b7e9';

const AddressSuggest = ({ value, onChange, onValid }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [selected, setSelected] = useState(false);
  const inputRef = useRef();

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    const response = await fetch(
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token ' + DADATA_API_KEY,
        },
        body: JSON.stringify({
          query,
          count: 7,
          locations: [{ country: 'Россия', city: 'Санкт-Петербург' }],
          restrict_value: true,
        }),
      },
    );
    const data = await response.json();
    setSuggestions(data.suggestions || []);
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setSelected(false);
    setShowSuggestions(true);
    onChange('');
    onValid(false, '');
    fetchSuggestions(val);
  };

  const handleSelect = (suggestion) => {
    setInputValue(suggestion.value);
    setShowSuggestions(false);
    setSelected(true);
    onChange(suggestion.value);
    onValid(true, suggestion.value, {
      ...suggestion.data,
      geo_lat: suggestion.data.geo_lat,
      geo_lon: suggestion.data.geo_lon,
    });
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  return (
    <div className="address-suggest">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInput}
        onBlur={handleBlur}
        placeholder="Введите адрес доставки"
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => handleSelect(s)}>
              {s.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressSuggest;
