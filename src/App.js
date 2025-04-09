import React from "react";
import { Route, Routes} from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/style.scss'
import './assets/scss/bootstrap.scss'
import './assets/css/materialdesignicons.min.css'

import Index from "./pages/index";
import IndexTwo from "./pages/index/index-two";
import IndexThree from "./pages/index/index-three";
import DoctorDashBoard from "./pages/dashboard/doctor-dashboard";
import DoctorAppointment from "./pages/dashboard/doctor-appointment";
import DoctorSchedule from "./pages/dashboard/doctor-schedule";
import Invoice from "./pages/dashboard/invoices";
import DoctorMessages from "./pages/dashboard/doctor-messages";
import DoctorProfile from "./pages/dashboard/doctor-profile";
import DoctorProfileSettimg from "./pages/dashboard/doctor-profile-setting";
import PatientList from "./pages/dashboard/patient-list";
import PatientReview from "./pages/dashboard/patient-review";
import DoctorChat from "./pages/dashboard/doctor-chat";
import DoctorTeamOne from "./pages/doctor/doctor-team-one";
import DoctorTeamTwo from "./pages/doctor/doctor-team-two";
import DoctorTeamThree from "./pages/doctor/doctor-team-three";
import PatientDashboard from "./pages/patient/patient-dashboard";
import PatientProfile from "./pages/patient/patient-profile";
import BookingAppointment from "./pages/patient/booking-appointment";
import PatientInvoice from "./pages/patient/patient-invoice";
import Pharmacy from "./pages/pharmacy/pharmacy";
import PharmacyShop from "./pages/pharmacy/pharmacy-shop";
import PharmacyProductDetail from "./pages/pharmacy/pharmacy-product-detail";
import ShopCart from "./pages/pharmacy/pharmacy-shop-cart";
import CheckOut from "./pages/pharmacy/pharmacy-checkout";
import PharmacyAccount from "./pages/pharmacy/pharmacy-account";
import AboutUs from "./pages/aboutus";
import Departments from "./pages/departments";
import Faqs from "./pages/faqs";
import Blogs from "./pages/blogs";
import BlogDetail from "./pages/blog-detail";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import Error from "./pages/error";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ForgotPassword from "./pages/forgot-password";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Index/>}/>
      <Route path="/index" element={<Index/>}/>
      <Route path="/index-two" element={<IndexTwo/>}/>
      <Route path="/index-three" element={<IndexThree/>}/>
      <Route path="/doctor-dashboard" element={<DoctorDashBoard/>}/>
      <Route path="/doctor-appointment" element={<DoctorAppointment/>}/>
      <Route path="/doctor-schedule" element={<DoctorSchedule/>}/>
      <Route path="/invoices" element={<Invoice/>}/>
      <Route path="/doctor-messages" element={<DoctorMessages/>}/>
      <Route path="/doctor-profile" element={<DoctorProfile/>}/>
      <Route path="/doctor-profile-setting" element={<DoctorProfileSettimg/>}/>
      <Route path="/patient-list" element={<PatientList/>}/>
      <Route path="/patient-review" element={<PatientReview/>}/>
      <Route path="/doctor-chat" element={<DoctorChat/>}/>
      <Route path="/doctor-team-one" element={<DoctorTeamOne/>}/>
      <Route path="/doctor-team-two" element={<DoctorTeamTwo/>}/>
      <Route path="/doctor-team-three" element={<DoctorTeamThree/>}/>
      <Route path="/patient-dashboard" element={<PatientDashboard/>}/>
      <Route path="/patient-profile" element={<PatientProfile/>}/>
      <Route path="/booking-appointment" element={<BookingAppointment/>}/>
      <Route path="/patient-invoice" element={<PatientInvoice/>}/>
      <Route path="/pharmacy" element={<Pharmacy/>}/>
      <Route path="/pharmacy-shop" element={<PharmacyShop/>}/>
      <Route path="/pharmacy-product-detail" element={<PharmacyProductDetail/>}/>
      <Route path="/pharmacy-product-detail/:id" element={<PharmacyProductDetail/>}/>
      <Route path="/pharmacy-shop-cart" element={<ShopCart/>}/>
      <Route path="/pharmacy-checkout" element={<CheckOut/>}/>
      <Route path="/pharmacy-account" element={<PharmacyAccount/>}/>
      <Route path="/aboutus" element={<AboutUs/>}/>
      <Route path="/departments" element={<Departments/>}/>
      <Route path="/faqs" element={<Faqs/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/blog-detail" element={<BlogDetail/>}/>
      <Route path="/blog-detail/:id" element={<BlogDetail/>}/>
      <Route path="/terms" element={<Terms/>}/>
      <Route path="/privacy" element={<Privacy/>}/>
      <Route path="/error" element={<Error/>}/>
      <Route path="*" element={<Error/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </Routes>
  );
}

export default App;
