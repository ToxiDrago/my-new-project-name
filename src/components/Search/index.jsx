import React from 'react';

const Search = ({ value, onChange }) => (
  <div className="search">
    <input
      type="text"
      placeholder="Поиск пиццы..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default Search;
