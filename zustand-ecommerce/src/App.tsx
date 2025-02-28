import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from './Products';
import Cart from './Cart';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default App;
