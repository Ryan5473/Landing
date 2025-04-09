import React,{useState} from "react";
import { Link } from "react-router-dom";

import bg1 from '../../assets/images/bg/pharm01.jpg'
import bg2 from '../../assets/images/bg/pharm02.jpg'
import bg3 from '../../assets/images/bg/pharm03.jpg'
import cta from '../../assets/images/pharmacy/cta.jpg'

import Counter from "../../components/counter";
import Footer from "../../components/footer";
import ScrollTop from "../../components/scrollTop";
import Navbar from "../../components/navbar";

import Carousel from 'react-bootstrap/Carousel';
import { productData, pharmaCategories } from "../../data/data";

import {FiHeart, FiEye,FiShoppingCart} from '../../assets/icons/vander'

import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';

export default function PharmacyShop(){
    let settings = {
        container: '.slider-range-four',
        items: 4,
        controls: false,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        speed: 400,
        gutter: 24,
        responsive: {
            992: {
                items: 4
            },

            767: {
                items: 2
            },
            

            320: {
                items: 1
            },
        },
      };

    let [index, setIndex] = useState(0);

    let handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
   
    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container"/>
        <section className="section">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <h5 className="mb-0">Most Viewed Products</h5>
      </div>
    </div>

    <div className="row">
      {productData.slice(0, 8).map((item, index) => (
        <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2" key={index}>
          <div className="card shop-list border-0 position-relative notify-card">
            <ul className="label list-unstyled mb-0">
              <li>
                <Link to="" className="badge rounded-pill badge-success">Featured</Link>
              </li>
            </ul>
            <div className="shop-image position-relative overflow-hidden rounded shadow">
              <Link to={`/pharmacy-product-detail/${item.id}`}>
                <img src={item.image} className="img-fluid" alt="" />
              </Link>
              <ul className="list-unstyled shop-icons">
                <li><Link to="#" className="btn btn-icon btn-pills btn-soft-danger"><FiHeart className="icons" /></Link></li>
                <li className="mt-2"><Link to={`/pharmacy-product-detail/${item.id}`} className="btn btn-icon btn-pills btn-soft-primary"><FiEye className="icons" /></Link></li>
                {item.inStock ? (
                  <li className="mt-2"><Link to="/pharmacy-shop-cart" className="btn btn-icon btn-pills btn-soft-warning"><FiShoppingCart className="icons" /></Link></li>
                ) : (
                  <li className="mt-2"><button className="btn btn-icon btn-pills btn-soft-secondary" disabled>Out of Stock</button></li>
                )}
              </ul>
              <Counter />
            </div>
            <div className="card-body content pt-4 p-2">
              <Link to={`/pharmacy-product-detail/${item.id}`} className="text-dark product-name h6">{item.name}</Link>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <div>
                  <h6 className="text-muted small font-italic mb-0 mt-1">{item.price}</h6>
                  <small
                         className={`badge ${item.status === 'disponible' ? 'bg-success' : 'bg-danger'} mt-1`}
                                                >
                     {item.status}
                                    </small>    
                </div>
                <ul className="list-unstyled text-warning mb-0">
                  {[...Array(5)].map((_, i) => (
                    <li className="list-inline-item" key={i}><i className="mdi mdi-star"></i></li>
                  ))}
                </ul>
              </div>
            </div>

            {item.status === "indisponible" ? (
  <div className="notify-panel-hover">
    <button className="btn btn-sm btn-outline-primary w-100">Notify Me</button>
  </div>
) : item.status === "disponible" ? (
  <div className="notify-panel-hover">
    <button className="btn btn-sm btn-outline-primary w-100">Add to Cart</button>
  </div>
) : null}

            
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


        <Footer/>
        <ScrollTop/>
        </>
    )
}