import React from 'react';

export default function Counter({ quantity, onQuantityChange }) {
  const decrement = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };

  const increment = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="d-flex align-items-center mt-2">
      <button className="btn btn-outline-secondary btn-sm" onClick={decrement} disabled={quantity <= 1}>
        -
      </button>
      <input
        type="number"
        className="form-control form-control-sm mx-1"
        value={quantity}
        min="1"
        onChange={(e) => {
          let val = parseInt(e.target.value, 10);
          if (isNaN(val) || val < 1) val = 1;
          onQuantityChange(val);
        }}
        style={{ width: '50px' }}
      />
      <button className="btn btn-outline-secondary btn-sm" onClick={increment}>
        +
      </button>
    </div>
  );
}
