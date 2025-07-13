// src/components/counterTwo.js
import React from "react";

export default function CounterTwo({ quantity, onQuantityChange }) {
  const increment = () => onQuantityChange(quantity + 1);
  const decrement = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="qty-icons ms-3">
      <button onClick={decrement} className="btn btn-icon btn-primary minus">-</button>
      <input
        min="0"
        name="quantity"
        value={quantity}
        type="number"
        className="btn btn-icon btn-primary qty-btn quantity"
        readOnly
      />
      <button onClick={increment} className="btn btn-icon btn-primary plus">+</button>
    </div>
  );
}
