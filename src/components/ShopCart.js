// src/components/ShopCart.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ShopCart() {
  const { cartItems, updateQuantity } = useCart();

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="sub-title mb-4">Shop Cart</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-6">
            <div className="table-responsive bg-white shadow rounded">
              <table className="table table-center table-padding mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3" style={{ minWidth: '20px' }}></th>
                    <th className="border-bottom p-3" style={{ minWidth: '300px' }}>Product</th>
                    <th className="border-bottom text-center p-3" style={{ minWidth: '160px' }}>Price</th>
                    <th className="border-bottom text-center p-3" style={{ minWidth: '190px' }}>Qty</th>
                    <th className="border-bottom text-end p-3" style={{ minWidth: '50px' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="h5 p-3 text-center">
                        <button className="text-danger bg-transparent border-0">
                          <i className="mdi mdi-close"></i>
                        </button>
                      </td>
                      <td className="p-3">
                        <div className="d-flex align-items-center">
                          <img src={item.image} className="img-fluid avatar avatar-small rounded shadow" style={{ height: 'auto' }} alt="" />
                          <h6 className="mb-0 ms-3">{item.name}</h6>
                        </div>
                      </td>
                      <td className="text-center p-3">{item.price}</td>
                      <td className="text-center shop-list p-3">
                        <div className="d-flex align-items-center justify-content-center">
                          <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span className="mx-2">{item.quantity}</span>
                          <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </td>
                      <td className="text-end font-weight-bold p-3">{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 ms-auto">
            <div className="table-responsive bg-white rounded shadow">
              <table className="table table-center table-padding mb-0">
                <tbody>
                  <tr>
                    <td className="h6 p-3">Subtotal</td>
                    <td className="text-end font-weight-bold p-3">${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</td>
                  </tr>
                  <tr>
                    <td className="h6 p-3">Taxes</td>
                    <td className="text-end font-weight-bold p-3">${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1}</td>
                  </tr>
                  <tr className="bg-light">
                    <td className="h6 p-3">Total</td>
                    <td className="text-end font-weight-bold p-3">${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.1}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-2 text-end">
              <Link to="/checkout" className="btn btn-primary">Proceed to checkout</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}