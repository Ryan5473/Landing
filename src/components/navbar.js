import React,{useState,useEffect} from "react";
import { Link, useLocation } from 'react-router-dom'

import logoDark from '../assets/images/logo-dark.png'
import logoLight from '../assets/images/logo-light.png'
import dr1 from '../assets/images/doctors/01.jpg'

import Offcanvas from 'react-bootstrap/Offcanvas';
import image from '../assets/images/mobile-app.svg'

import {FiSettings, FiSearch,GrDashboard, LiaSignOutAltSolid, FiShoppingCart, FiDribbble,RiBehanceLine, FaFacebookF,FiInstagram, FiTwitter,LuMail, LuGlobe} from '../assets/icons/vander'

export default function Navbar({navDark, manuClass,containerClass}){
    let [show, setShow] = useState(false);
    let [showTwo, setShowTwo] = useState(false);
    let [scroll, setScroll] = useState(false);
    let [isMenu, setisMenu] = useState(false);
    let [modal, setModal] = useState(false)

    let handleClose = () => setShow(false);
    let handleShow = () => setShow(true);


    let handleCloseTwo = () => setShowTwo(false);
    let handleShowTwo = () => setShowTwo(true);


    let [manu , setManu] = useState('');
    let location = useLocation();

    useEffect(() => {

        let current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
        setManu(current)

        window.addEventListener("scroll", () => {
          setScroll(window.scrollY > 50);
        });
        window.scrollTo(0, 0);
        const closeModal = ()=>{
            setModal(false)
        }
        document.addEventListener("mousedown",closeModal)
        return()=>{
            document.removeEventListener("mousedown",closeModal)
        }
      }, []);

      let toggleMenu = () => {
        setisMenu(!isMenu);
        if (document.getElementById("navigation")) {
            const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
            anchorArray.forEach(element => {
                element.addEventListener('click', (elem) => {
                    const target = elem.target.getAttribute("href")
                    if (target !== "") {
                        if (elem.target.nextElementSibling) {
                            var submenu = elem.target.nextElementSibling.nextElementSibling;
                            submenu.classList.toggle('open');
                        }
                    }
                })
            });
        }
    };
    return(
        <header id="topnav" className={`${scroll ? "nav-sticky" :""} navigation sticky`}>
            <div className={containerClass}>
                <div>
                    {navDark === true ? 
                    <Link className="logo" to="/">
                        <img src={logoDark} height="22" className="logo-light-mode" alt=""/>
                        <img src={logoLight} height="22" className="logo-dark-mode" alt=""/>
                    </Link> :

                    <Link className="logo" to="/">
                        <span className="logo-light-mode">
                            <img src={logoDark} className="l-dark" height="22" alt=""/>
                            <img src={logoLight} className="l-light" height="22" alt=""/>
                        </span>
                        <img src={logoLight} height="22" className="logo-dark-mode" alt=""/>
                    </Link>
                    }
                </div>
        
                <div className="menu-extras">
                    <div className="menu-item">
                        <Link to="#"  className={`navbar-toggle ${isMenu ? 'open' : ''}`} id="isToggle" onClick={() => toggleMenu()}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    </div>
                </div>

                <ul className="dropdowns list-inline mb-0">
                    <li className="list-inline-item mb-0">
                        <Link to="#"  onClick={handleShowTwo}>
                            <div className="btn btn-icon btn-pills btn-primary"><FiSettings className="fea icon-sm"/></div>
                        </Link>
                    </li>
                    <Offcanvas show={showTwo} onHide={handleCloseTwo} placement="end">
                        <Offcanvas.Header closeButton className="offcanvas-header p-4 border-bottom">
                            <h5 id="offcanvasRightLabel" className="mb-0">
                                <img src={logoDark} height="22" className="light-version" alt=""/>
                                <img src={logoLight} height="22" className="dark-version" alt=""/>
                            </h5>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div className="row">
                                <div className="col-12">
                                    <div>
                                        <div>
                                            <img src={image} alt="" className="w-75 h-auto mx-auto d-block"/>
                                        </div>
                                        <h5 className="my-4">Get in touch!</h5>
                                        <form>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Your Name <span className="text-danger">*</span></label>
                                                        <input name="name" id="name" type="text" className="form-control border rounded" placeholder="First Name :"/>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Your Email <span className="text-danger">*</span></label>
                                                        <input name="email" id="email" type="email" className="form-control border rounded" placeholder="Your email :"/>
                                                    </div> 
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Subject</label>
                                                        <input name="subject" id="subject" className="form-control border rounded" placeholder="Your subject :"/>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Comments <span className="text-danger">*</span></label>
                                                        <textarea name="comments" id="comments" rows="4" className="form-control border rounded" placeholder="Your Message :"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <button type="submit" id="submit" name="send" className="btn btn-primary">Send Message</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Offcanvas.Body>
                        <div className="offcanvas-footer p-4 border-top text-center">
                            <ul className="list-unstyled social-icon social mb-0">
                                <li className="list-inline-item mb-0"><Link to="https://1.envato.market/doctris-react" target="_blank" className="rounded"><FiShoppingCart className="align-middle mb-0"/></Link></li>
                                <li className="list-inline-item mb-0"><Link to="https://dribbble.com/shreethemes" target="_blank" className="rounded"><FiDribbble className="align-middle mb-0"/></Link></li>
                                <li className="list-inline-item mb-0"><Link to="https://www.behance.net/shreethemes" target="_blank" className="rounded"><RiBehanceLine className="align-middle mb-0"/></Link></li>
                                <li className="list-inline-item mb-0"><Link to="https://www.facebook.com/shreethemes" target="_blank" className="rounded"><FaFacebookF className="align-middle mb-0"/></Link></li>
                                <li className="list-inline-item mb-0"><Link to="https://www.instagram.com/shreethemes/" target="_blank" className="rounded"><FiInstagram className="align-middle mb-0"/></Link></li>
                                <li className="list-inline-item mb-0"><Link to="https://twitter.com/shreethemes" target="_blank" className="rounded"><FiTwitter className="align-middle mb-0"/></Link></li>
                                <li className="list-inline-item mb-0"><Link to="mailto:support@shreethemes.in" className="rounded"><LuMail className="align-middle mb-0"/></Link></li>
                                <li className="list-inline-item mb-0"><Link to="https://shreethemes.in" target="_blank" className="rounded"><LuGlobe className="align-middle mb-0"/></Link></li>
                            </ul>
                        </div>
                    </Offcanvas>

                    <li className="list-inline-item mb-0 ms-1">
                        <Link to="#" className="btn btn-icon btn-pills btn-primary" onClick={handleShow} >
                            <FiSearch/>
                        </Link>
                    </li>
                    <Offcanvas show={show} onHide={handleClose} placement="top" style={{height:'250px'}}>
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="pb-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <div className="text-center">
                                            <h4>Search now.....</h4>
                                            <div className="subcribe-form mt-4">
                                                <form>
                                                    <div className="mb-0">
                                                        <input type="text" id="help" name="name" className="border rounded-pill" required="" placeholder="Search"/>
                                                        <button type="submit" className="btn btn-pills btn-primary">Search</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>

                    <li className="list-inline-item mb-0 ms-1">
                        <div className="dropdown dropdown-primary">
                            <button type="button" className="btn btn-pills btn-soft-primary dropdown-toggle p-0" onClick={()=>setModal(!modal)}><img src={dr1} className="avatar avatar-ex-small rounded-circle" alt=""/></button>
                            <div className={`${modal === true ? 'show' : ''} dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3`} style={{minWidth:"200px"}}>
                                <Link className="dropdown-item d-flex align-items-center text-dark" to="/doctor-profile">
                                    <img src={dr1} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                    <div className="flex-1 ms-2">
                                        <span className="d-block mb-1">Calvin Carlo</span>
                                        <small className="text-muted">Orthopedic</small>
                                    </div>
                                </Link>
                                <Link className="dropdown-item text-dark mb-2" to="/doctor-dashboard"><span className="mb-0 d-inline-block me-1"><GrDashboard className="align-middle h6 mb-0"/></span> Dashboard</Link>
                                <Link className="dropdown-item text-dark" to="/doctor-profile-setting"><span className="mb-0 d-inline-block me-1"><FiSettings className="align-middle h6 mb-0"/></span> Profile Settings</Link>
                                <div className="dropdown-divider border-top"></div>
                                <Link className="dropdown-item text-dark" to="/login"><span className="mb-0 d-inline-block me-1"><LiaSignOutAltSolid className="align-middle h6 mb-0"/></span> Logout</Link>
                            </div>
                        </div>
                    </li>
                </ul>

                <div id="navigation" style={{ display: isMenu ? 'block' : 'none' }}>
                    <ul className={manuClass}>
                        <li className={`${["", "index","index-two", "index-three"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                            <Link to="#">Home</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li className={manu === "index" || "" ? "active" : ""}><Link to="/index" className="sub-menu-item">Index One</Link></li>
                                <li className={manu === "index-two" ? "active" : ""}><Link to="/index-two" className="sub-menu-item">Index Two</Link></li>
                                <li className={manu === "index-three" ? "active" : ""}><Link to="/index-three" className="sub-menu-item">Index Three</Link></li>
                            </ul>
                        </li>

                        <li className={`${["doctor-dashboard", "doctor-appointment","patient-list", "doctor-schedule","invoices","patient-review","doctor-messages","doctor-profile","doctor-profile-setting","doctor-chat","login","signup","forgot-password","doctor-team-one","doctor-team-two","doctor-team-three"].includes(manu)? "active" : ""} has-submenu parent-parent-menu-item`}>
                            <Link to="#">Doctors</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li className={`${["doctor-dashboard", "doctor-appointment","patient-list", "doctor-schedule","invoices","patient-review","doctor-messages","doctor-profile","doctor-profile-setting","doctor-chat","login","signup","forgot-password"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                                    <Link to="#" className="menu-item"> Dashboard </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li className={manu === "doctor-dashboard" ? "active" : ""}><Link to="/doctor-dashboard" className="sub-menu-item">Dashboard</Link></li>
                                        <li className={manu === "doctor-appointment" ? "active" : ""}><Link to="/doctor-appointment" className="sub-menu-item">Appointment</Link></li>
                                        <li className={manu === "patient-list" ? "active" : ""}><Link to="/patient-list" className="sub-menu-item">Patients</Link></li>
                                        <li className={manu === "doctor-schedule" ? "active" : ""}><Link to="/doctor-schedule" className="sub-menu-item">Schedule Timing</Link></li>
                                        <li className={manu === "invoices" ? "active" : ""}><Link to="/invoices" className="sub-menu-item">Invoices</Link></li>
                                        <li className={manu === "patient-review" ? "active" : ""}><Link to="/patient-review" className="sub-menu-item">Reviews</Link></li>
                                        <li className={manu === "doctor-messages" ? "active" : ""}><Link to="/doctor-messages" className="sub-menu-item">Messages</Link></li>
                                        <li className={manu === "doctor-profile" ? "active" : ""}><Link to="/doctor-profile" className="sub-menu-item">Profile</Link></li>
                                        <li className={manu === "doctor-profile-setting" ? "active" : ""}><Link to="/doctor-profile-setting" className="sub-menu-item">Profile Settings</Link></li>
                                        <li className={manu === "doctor-chat" ? "active" : ""}><Link to="/doctor-chat" className="sub-menu-item">Chat</Link></li>
                                        <li className={manu === "login" ? "active" : ""}><Link to="/login" className="sub-menu-item">Login</Link></li>
                                        <li className={manu === "signup" ? "active" : ""}><Link to="/signup" className="sub-menu-item">Sign Up</Link></li>
                                        <li  className={manu === "forgot-password" ? "active" : ""}><Link to="/forgot-password" className="sub-menu-item">Forgot Password</Link></li>
                                    </ul>
                                </li>
                                <li className={manu === "doctor-team-one" ? "active" : ""}><Link to="/doctor-team-one" className="sub-menu-item">Doctors One</Link></li>
                                <li className={manu === "doctor-team-two" ? "active" : ""}><Link to="/doctor-team-two" className="sub-menu-item">Doctors Two</Link></li>
                                <li className={manu === "doctor-team-three" ? "active" : ""}><Link to="/doctor-team-three" className="sub-menu-item">Doctors Three</Link></li>
                            </ul>
                        </li>

                        <li className={`${["patient-dashboard", "patient-profile","booking-appointment", "patient-invoice"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                            <Link to="#">Patients</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li className={manu === "patient-dashboard" ? "active" : ""}><Link to="/patient-dashboard" className="sub-menu-item">Dashboard</Link></li>
                                <li className={manu === "patient-profile" ? "active" : ""}><Link to="/patient-profile" className="sub-menu-item">Profile</Link></li>
                                <li className={manu === "booking-appointment" ? "active" : ""}><Link to="/booking-appointment" className="sub-menu-item">Book Appointment</Link></li>
                                <li className={manu === "patient-invoice" ? "active" : ""}><Link to="/patient-invoice" className="sub-menu-item">Invoice</Link></li>
                            </ul>
                        </li>

                        <li className={`${["pharmacy", "pharmacy-shop","pharmacy-product-detail", "pharmacy-shop-cart","pharmacy-checkout","pharmacy-account"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                            <Link to="#">Pharmacy</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li className={manu === "pharmacy" ? "active" : ""}><Link to="/pharmacy" className="sub-menu-item">Pharmacy</Link></li>
                                <li className={manu === "pharmacy-shop" ? "active" : ""}><Link to="/pharmacy-shop" className="sub-menu-item">Shop</Link></li>
                                <li className={manu === "pharmacy-product-detail" ? "active" : ""}><Link to="/pharmacy-product-detail" className="sub-menu-item">Medicine Detail</Link></li>
                                <li className={manu === "pharmacy-shop-cart" ? "active" : ""}><Link to="/pharmacy-shop-cart" className="sub-menu-item">Shop Cart</Link></li>
                                <li className={manu === "pharmacy-checkout" ? "active" : ""}><Link to="/pharmacy-checkout" className="sub-menu-item">Checkout</Link></li>
                                <li  className={manu === "pharmacy-account" ? "active" : ""}><Link to="/pharmacy-account" className="sub-menu-item">Account</Link></li>
                            </ul>
                        </li>

                        <li className={`${["aboutus", "departments","faqs", "blogs","blog-detail","terms","privacy","error","contact"].includes(manu)? "active" : ""} has-submenu parent-parent-menu-item`}><Link to="#">Pages</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li className={manu === "aboutus" ? "active" : ""}><Link to="/aboutus" className="sub-menu-item"> About Us</Link></li>
                                <li className={manu === "departments" ? "active" : ""}><Link to="/departments" className="sub-menu-item">Departments</Link></li>
                                <li className={manu === "faqs" ? "active" : ""}><Link to="/faqs" className="sub-menu-item">FAQs</Link></li>
                                <li className={`${["blogs", "blog-detail"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                                    <Link to="#" className="menu-item"> Blogs </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li className={manu === "blogs" ? "active" : ""}><Link to="/blogs" className="sub-menu-item">Blogs</Link></li>
                                        <li className={manu === "blog-detail" ? "active" : ""}><Link to="/blog-detail" className="sub-menu-item">Blog Details</Link></li>
                                    </ul>
                                </li>
                                <li className={manu === "terms" ? "active" : ""}><Link to="/terms" className="sub-menu-item">Terms & Policy</Link></li>
                                <li className={manu === "privacy" ? "active" : ""}><Link to="/privacy" className="sub-menu-item">Privacy Policy</Link></li>
                                <li className={manu === "error" ? "active" : ""}><Link to="/error" className="sub-menu-item">404 !</Link></li>
                                <li className={manu === "contact" ? "active" : ""}><Link to="/contact" className="sub-menu-item">Contact</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}