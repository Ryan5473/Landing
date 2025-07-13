import React from 'react';

export default function Counter({ quantity, onQuantityChange }) {
  const decrement = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };

  const increment = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="qty-icons d-flex align-items-center">
      <button
        className="btn btn-pills btn-icon btn-primary minus"
        onClick={decrement}
        disabled={quantity <= 1}
        type="button"
      >
        -
      </button>
      <input
        type="text"
        readOnly
        className="btn btn-pills btn-icon btn-primary qty-btn quantity mx-2"
        value={quantity}
        style={{ width: '40px', textAlign: 'center', pointerEvents: 'none' }}
      />
      <button
        className="btn btn-pills btn-icon btn-primary plus"
        onClick={increment}
        type="button"
      >
        +
      </button>
    </div>
  );
}
