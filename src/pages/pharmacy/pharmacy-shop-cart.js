// src/pages/ShopCart.js

/*

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import ScrollTop from '../../components/scrollTop';
import { useCart } from '../../context/CartContext';

export default function ShopCart() {
  const { cart, updateQuantity, removeItem } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  const increment = (item) => {
    updateQuantity(item.name, item.quantity + 1);
  };

  const decrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.name, item.quantity - 1);
    }
  };

  return (
    <>
      <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container" />

      <section className="section">
        <div className="container">
          <h3>Your Cart</h3>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ddd' }}>
                    <th style={{ padding: '8px' }}>Remove</th>
                    <th style={{ padding: '8px' }}>Product</th>
                    <th style={{ padding: '8px', textAlign: 'center' }}>Price</th>
                    <th style={{ padding: '8px', textAlign: 'center' }}>Quantity</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.name} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        <button
                          onClick={() => removeItem(item.name)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'red',
                            cursor: 'pointer',
                            fontSize: '16px',
                          }}
                          aria-label={`Remove ${item.name}`}
                        >
                          &#x2715;
                        </button>
                      </td>
                      <td style={{ padding: '8px' }}>{item.name}</td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>${Number(item.price).toFixed(2)}</td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                          <button
                            onClick={() => decrement(item)}
                            disabled={item.quantity <= 1}
                            style={{
                              padding: '4px 8px',
                              cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                            }}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            readOnly
                            value={item.quantity}
                            style={{
                              width: '40px',
                              textAlign: 'center',
                              margin: '0 5px',
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              padding: '4px 0',
                            }}
                          />
                          <button
                            onClick={() => increment(item)}
                            style={{ padding: '4px 8px', cursor: 'pointer' }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
                <p>Taxes (10%): <strong>${taxes.toFixed(2)}</strong></p>
                <p>Total: <strong>${total.toFixed(2)}</strong></p>
                <Link
                  to="#"
                  style={{
                    display: 'inline-block',
                    marginTop: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '5px',
                  }}
                >
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
      <ScrollTop />
    </>
  );
}
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import ScrollTop from '../../components/scrollTop';
import { useCart } from '../../context/CartContext';

export default function ShopCart() {
  const { cart, updateQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  const increment = (item) => {
    updateQuantity(item.name, item.quantity + 1);
  };

  const decrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.name, item.quantity - 1);
    }
  };

  // Checkout button handler
  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Prepare items array matching backend DTO
      const items = cart.map(item => ({
        name: item.name,
        amount: Math.round(Number(item.price) * 100), // cents
        quantity: item.quantity,
        currency: "usd", // adjust if needed
      }));

      const response = await fetch('http://localhost:8081/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        alert('Failed to get checkout URL from server.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container" />

      <section className="section">
        <div className="container">
          <h3>Your Cart</h3>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ddd' }}>
                    <th style={{ padding: '8px' }}>Remove</th>
                    <th style={{ padding: '8px' }}>Product</th>
                    <th style={{ padding: '8px', textAlign: 'center' }}>Price</th>
                    <th style={{ padding: '8px', textAlign: 'center' }}>Quantity</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.name} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        <button
                          onClick={() => removeItem(item.name)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'red',
                            cursor: 'pointer',
                            fontSize: '16px',
                          }}
                          aria-label={`Remove ${item.name}`}
                        >
                          &#x2715;
                        </button>
                      </td>
                      <td style={{ padding: '8px' }}>{item.name}</td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>${Number(item.price).toFixed(2)}</td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                          <button
                            onClick={() => decrement(item)}
                            disabled={item.quantity <= 1}
                            style={{
                              padding: '4px 8px',
                              cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                            }}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            readOnly
                            value={item.quantity}
                            style={{
                              width: '40px',
                              textAlign: 'center',
                              margin: '0 5px',
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              padding: '4px 0',
                            }}
                          />
                          <button
                            onClick={() => increment(item)}
                            style={{ padding: '4px 8px', cursor: 'pointer' }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
                <p>Taxes (10%): <strong>${taxes.toFixed(2)}</strong></p>
                <p>Total: <strong>${total.toFixed(2)}</strong></p>
                <button
                  onClick={handleCheckout}
                  disabled={loading || cart.length === 0}
                  style={{
                    display: 'inline-block',
                    marginTop: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: loading || cart.length === 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
      <ScrollTop />
    </>
  );
}
