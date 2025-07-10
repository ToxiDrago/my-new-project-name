import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

const App = () => {
  const [cartItems, setCartItems] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState('rating');

  const addToCart = (pizza) => {
    setCartItems((prev) => [...prev, pizza]);
  };

  const removeFromCart = (item) => {
    setCartItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const totalCount = cartItems.length;

  return (
    <Router>
      <div className="wrapper">
        <Header totalPrice={totalPrice} totalCount={totalCount} />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  pizzas={[]}
                  categoryId={categoryId}
                  sortType={sortType}
                  onCategoryChange={setCategoryId}
                  onSortChange={setSortType}
                  onAddToCart={addToCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  items={cartItems}
                  totalPrice={totalPrice}
                  onRemove={removeFromCart}
                  onMinus={() => {}}
                  onPlus={() => {}}
                  onClear={() => setCartItems([])}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
