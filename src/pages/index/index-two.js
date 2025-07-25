import React from "react";
import { Link } from "react-router-dom";

import heroImag from '../../assets/images/hero.png'
import accordionImage from '../../assets/images/svg/vaccine-development-amico.svg'

import Navbar from "../../components/navbar";
import AboutImage from "../../components/aboutImage";
import CtaTwo from "../../components/cta/ctaTwo";
import AccordionOne from "../../components/accordion/accordionOne";
import Footer from "../../components/footer";
import ScrollTop from "../../components/scrollTop";

import {RiSearchLine, RiArrowRightLine, FiHeart, RiMapPinLine, RiTimeLine, RiMoneyDollarCircleLine, FiFacebook, FiLinkedin, FiGithub, FiTwitter} from '../../assets/icons/vander'
import { partners, category,doctorData } from "../../data/data";

export default function IndexTwo(){
  return (
    <>
      <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container" />

      {/* Hero Section */}
      <section className="bg-half-170 pb-0 d-table w-100">
        <div className="container">
          <div className="row mt-5 mt-sm-0 align-items-center">
            <div className="col-md-6">
              <div className="heading-title">
                <h4 className="heading mb-3">Find Best Doctor</h4>
                <p className="para-desc text-muted mb-0">
                  Great doctor if you need your family member to get immediate assistance,
                  emergency treatment or a simple consultation.
                </p>
              </div>
              <div className="subcribe-form mt-4">
                <form className="ms-0" style={{ maxWidth: '550px' }}>
                  <div className="mb-2 d-flex">
                    <input type="text" id="name" name="name" className="form-control border rounded-pill" required placeholder="Doctor name..." />
                    <button type="submit" className="btn btn-pills btn-primary ms-2">
                      <RiSearchLine className="align-middle me-1" /> Search
                    </button>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p className="text-muted mb-0"><b>Note:</b> Please search best doctors here,</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <img src={heroImag} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            {partners.map((item, index) => (
              <div className="col-lg-2 col-md-2 col-6 text-center py-4" key={index}>
                <img src={item} className="avatar avatar-client" alt="" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center mb-4">
              <h4 className="title mb-4">Explore By Categories</h4>
              <p className="text-muted mx-auto para-desc mb-0">
                Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            {category.map((item, index) => {
              const Icon = item.icon;
              return (
                <div className="col-xl col-md-4 col-12 mt-4 pt-2" key={index}>
                  <div className="card features feature-primary border-0 p-4 rounded-md shadow">
                    <div className="icon text-center rounded-lg">
                      <Icon className="h3 mb-0" />
                    </div>
                    <div className="card-body p-0 mt-3">
                      <Link to="/departments" className="title text-dark h5">{item.title}</Link>
                      <p className="text-muted mt-3">{item.desc}</p>
                      <Link to="/departments" className="link">Find here <RiArrowRightLine className="align-middle" /></Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* About Section */}
        <div className="container mt-100 mt-60">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-6">
              <div className="section-title me-lg-5">
                <span className="badge rounded-pill bg-soft-primary">About Doctris</span>
                <h4 className="title mt-3 mb-4">Good Services And Better <br /> Health By Our Specialists</h4>
                <p className="para-desc text-muted">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                <p className="para-desc text-muted">The most well-known dummy text is the 'Lorem Ipsum'...</p>
                <div className="mt-4">
                  <Link to="/aboutus" className="btn btn-soft-primary">Read More</Link>
                </div>
              </div>
            </div>
            <AboutImage colClass="col-lg-5 col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0" />
          </div>
        </div>
      </section>

      <CtaTwo />

      {/* Doctors Section */}
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center mb-4">
              <span className="badge rounded-pill bg-soft-primary">Find Doctors</span>
              <h4 className="title mt-3 mb-4">Find Your Specialists</h4>
              <p className="text-muted mx-auto para-desc mb-0">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
            </div>
          </div>

          <div className="row align-items-center">
            {doctorData.map((item, index) => (
              <div className="col-xl-3 col-lg-3 col-md-6 mt-4 pt-2" key={index}>
                {/* Toute la carte est un lien vers doctor-profile */}
                <Link to="/doctor-profile" className="text-decoration-none">
                  <div className="card team border-0 rounded shadow overflow-hidden">
                    <div className="team-person position-relative overflow-hidden">
                      <img src={item.image} className="img-fluid" alt={item.name} />
                      <ul className="list-unstyled team-like">
                        <li><Link to="#" className="btn btn-icon btn-pills btn-soft-danger"><FiHeart className="icons" /></Link></li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <span className="title text-dark h5 d-block mb-0">{item.name}</span>
                      <small className="text-muted speciality">{item.speciality}</small>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <ul className="list-unstyled mb-0 d-flex">
                          {[...Array(5)].map((_, i) => (
                            <li className="list-inline-item" key={i}>
                              <i className="mdi mdi-star text-warning"></i>
                            </li>
                          ))}
                        </ul>
                        <p className="text-muted mb-0">5 Star</p>
                      </div>
                      <ul className="list-unstyled mt-2 mb-0">
                        <li className="d-flex">
                          <RiMapPinLine className="text-primary align-middle" />
                          <small className="text-muted ms-2">{item.location}</small>
                        </li>
                        <li className="d-flex mt-2">
                          <RiTimeLine className="text-primary align-middle" />
                          <small className="text-muted ms-2">{item.time}</small>
                        </li>
                        <li className="d-flex mt-2">
                          <RiMoneyDollarCircleLine className="text-primary align-middle" />
                          <small className="text-muted ms-2">{item.charges}</small>
                        </li>
                      </ul>
                      <ul className="list-unstyled mt-3 mb-3 d-flex">
                        <li className="list-inline-item"><Link to="#" className="btn btn-icon btn-pills btn-soft-primary"><FiFacebook /></Link></li>
                        <li className="list-inline-item ms-2"><Link to="#" className="btn btn-icon btn-pills btn-soft-primary"><FiLinkedin /></Link></li>
                        <li className="list-inline-item ms-2"><Link to="#" className="btn btn-icon btn-pills btn-soft-primary"><FiGithub /></Link></li>
                        <li className="list-inline-item ms-2"><Link to="#" className="btn btn-icon btn-pills btn-soft-primary"><FiTwitter /></Link></li>
                      </ul>

                      {/* Book Button (ici aussi dans le lien global) */}
                      <div className="text-center">
  <Link to="/booking-appointment">
    <span className="btn btn-pills btn-primary w-100">Book Appointment</span>
  </Link>
</div>

                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Accordion Section */}
          <div className="container mt-100 mt-60">
            <div className="row align-items-center">
              <div className="col-md-6 col-12">
                <div className="me-lg-5">
                  <img src={accordionImage} className="img-fluid" alt="" />
                </div>
              </div>
              <div className="col-md-6 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                <AccordionOne />
              </div>
            </div>

            {/* Contact CTA */}
            <div className="row mt-4 pt-2 justify-content-center">
              <div className="col-12 text-center">
                <div className="section-title">
                  <h4 className="title mb-4">Have Question ? Get in touch!</h4>
                  <p className="text-muted para-desc mx-auto">
                    Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.
                  </p>
                  <Link to="/contact" className="btn btn-primary mt-4">
                    <i className="mdi mdi-phone"></i> Contact us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollTop />
    </>
  );
};