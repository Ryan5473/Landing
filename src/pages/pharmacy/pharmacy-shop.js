import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import ScrollTop from '../../components/scrollTop';
import { FiHeart, FiEye, FiShoppingCart } from '../../assets/icons/vander';
import { useCart } from '../../context/CartContext';

export default function PharmacyShop() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <>
      <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container" />

      <section className="section">
        <div className="container">
          <h5 className="mb-0">Most Viewed Products</h5>
          <div className="row">
            {products.map(item => (
              <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2" key={item.id}>
                <div className="card shop-list border-0 position-relative notify-card">
                  <div className="shop-image position-relative overflow-hidden rounded shadow">
                    <Link to={`/pharmacy-product-detail/${item.id}`}>
                      <img src={item.image} className="img-fluid" alt={item.name} />
                    </Link>

                    <ul className="list-unstyled shop-icons">
                      <li>
                        <Link to="#" className="btn btn-icon btn-pills btn-soft-danger"><FiHeart /></Link>
                      </li>
                      <li>
                        <Link to={`/pharmacy-product-detail/${item.id}`} className="btn btn-icon btn-pills btn-soft-primary"><FiEye /></Link>
                      </li>
                      <li>
                        <button
                          className="btn btn-icon btn-pills btn-soft-warning"
                          onClick={() => addToCart(item, 1)}
                          aria-label={`Add ${item.name} to cart`}
                        >
                          <FiShoppingCart />
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="card-body content pt-4 p-2">
                    <Link to={`/pharmacy-product-detail/${item.id}`} className="text-dark product-name h6">
                      {item.name}
                    </Link>

                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <div>
                        <h6 className="text-muted small font-italic mb-0 mt-1">${Number(item.price).toFixed(2)}</h6>
                        <small className={`badge ${item.status === 'disponible' ? 'bg-success' : 'bg-danger'} mt-1`}>
                          {item.status}
                        </small>
                      </div>
                    </div>

                    {/* Remove counter, just Add to Cart button */}
                    <button
                      className="btn btn-sm btn-outline-primary w-100 mt-2"
                      onClick={() => addToCart(item, 1)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollTop />
    </>
  );
}
