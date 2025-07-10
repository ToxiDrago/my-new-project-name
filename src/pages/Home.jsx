import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';

const Home = ({ pizzas, categoryId, sortType, onCategoryChange, onSortChange, onAddToCart }) => {
  const filteredPizzas = pizzas
    .filter((pizza) => categoryId === 0 || pizza.category === categoryId)
    .sort((a, b) => {
      if (sortType === 'price') return a.price - b.price;
      if (sortType === 'title') return a.name.localeCompare(b.name);
      return b.rating - a.rating;
    });

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onCategoryChange} />
        <Sort value={sortType} onChangeSort={onSortChange} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {filteredPizzas.map((pizza) => (
          <PizzaBlock key={pizza.id} {...pizza} onAdd={() => onAddToCart(pizza)} addedCount={0} />
        ))}
      </div>
    </div>
  );
};

export default Home;
