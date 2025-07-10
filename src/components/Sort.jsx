import React from 'react';

const sortOptions = [
  { name: 'по популярности', sortProperty: 'rating' },
  { name: 'по цене', sortProperty: 'price' },
  { name: 'по алфавиту', sortProperty: 'title' },
];

const Sort = ({ value, onChangeSort }) => {
  const [open, setOpen] = React.useState(false);

  const onClickListItem = (option) => {
    onChangeSort(option);
    setOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortOptions.map((option, i) => (
              <li
                key={option.sortProperty}
                onClick={() => onClickListItem(option)}
                className={value.sortProperty === option.sortProperty ? 'active' : ''}>
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
