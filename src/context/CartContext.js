// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product or increase quantity if exists based on product.name
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.name === product.name);

      if (existingProduct) {
        return prevCart.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (name, quantity) => {
    if (quantity <= 0) {
      removeItem(name);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.name === name ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeItem = (name) => {
    setCart(prev => prev.filter(item => item.name !== name));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
