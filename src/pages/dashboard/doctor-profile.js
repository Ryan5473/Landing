import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import profileImage from "../../assets/images/doctors/dr-profile.png";
import Navbar from "../../components/navbar";
import AdminFooter from "../../components/dashboard/adminFooter";
import ScrollTop from "../../components/scrollTop";

import {
  doctorData,
  experienceData,
  patientsData,
  partners,
} from "../../data/data";

import {
  FiHeart,
  RiMapPinLine,
  RiTimeLine,
  RiMoneyDollarCircleLine,
  FiFacebook,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiArrowRight,
  RiTimeFill,
  FiPhone,
  FiMail,
} from "../../assets/icons/vander";

import TinySlider from "tiny-slider-react";
import "tiny-slider/dist/tiny-slider.css";

// Mock service
const fetchAvailabilityData = () => {
  return Promise.resolve([
    {
      day: "Monday",
      slots: [
        { time: "9:00 - 9:45", available: true },
        { time: "10:00 - 10:45", available: false },
        { time: "11:00 - 11:45", available: true },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        { time: "9:00 - 9:45", available: true },
        { time: "10:00 - 10:45", available: true },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        { time: "9:00 - 9:45", available: true },
        { time: "10:00 - 10:45", available: true },
      ],
    },
  ]);
};

export default function DoctorProfile() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [availability, setAvailability] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);

  useEffect(() => {
    fetchAvailabilityData().then((data) => {
      setAvailability(data);
      if (data.length > 0) {
        setSelectedDay(data[0].day);
        setSelectedSlots(
          data[0].slots.filter((s) => s.available).map((s) => s.time)
        );
      }
    });
  }, []);

  const handleDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day);
    const dayData = availability.find((a) => a.day === day);
    if (dayData) {
      setSelectedSlots(
        dayData.slots.filter((s) => s.available).map((s) => s.time)
      );
    } else {
      setSelectedSlots([]);
    }
  };

  const toggleSlot = (time) => {
    setSelectedSlots((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSave = () => {
    setAvailability((prev) =>
      prev.map((dayObj) =>
        dayObj.day === selectedDay
          ? {
              ...dayObj,
              slots: dayObj.slots.map((slot) => ({
                ...slot,
                available: selectedSlots.includes(slot.time),
              })),
            }
          : dayObj
      )
    );
    setShowModal(false);
  };

  const currentDaySlots =
    availability.find((d) => d.day === selectedDay)?.slots || [];

  const settings = {
    container: ".slider-range-four",
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
      992: { items: 4 },
      767: { items: 2 },
      320: { items: 1 },
    },
  };

  const settings2 = {
    container: ".client-review-slider",
    items: 1,
    controls: false,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    speed: 400,
    gutter: 16,
  };

  return (
    <>
      <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container" />
      <section className="bg-dashboard my-lg-5">
        <div className="container mt-xl-5">
          <div className="row">
            <div className="col-12">
              <div className="card border-0 rounded shadow">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-5 position-relative">
                    <img src={profileImage} className="img-fluid dr-profile-img" alt="" />
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-7">
                    <div className="p-lg-5 p-4">
                      <small className="text-muted">25th December, 2020 - 5:00PM</small>
                      <h4 className="my-3">
                        Good Morning ! <br /> <span className="text-primary h2">Dr. Christopher Burrell</span>
                      </h4>
                      <p className="para-desc text-muted">
                        Great doctor if you need your family member to get effective immediate assistance, emergency
                        treatment or a simple consultation.
                      </p>
                      <h6 className="mb-0">
                        You have <span className="text-primary">18 patients</span> remaining today!
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mt-4 pt-2">
              <div className="card border-0 shadow rounded p-4">
                <ul className="nav nav-pills nav-justified flex-column flex-sm-row rounded shadow overflow-hidden bg-light">
                  {["Overview", "Experience", "Reviews", "Location", "Time Table"].map((label, i) => (
                    <li className="nav-item" key={i}>
                      <Link
                        className={`${activeIndex === i + 1 ? "active" : ""} nav-link rounded-0`}
                        to="#"
                        onClick={() => setActiveIndex(i + 1)}
                      >
                        <div className="text-center pt-1 pb-1">
                          <h5 className="mb-0">{label}</h5>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="tab-content mt-4">
                  {activeIndex === 1 && (
                    <div>
                      <h5 className="mb-1">Dr. Christopher Burrell</h5>
                      <Link to="#" className="text-primary">Gynecologist</Link>, &nbsp;
                      <Link to="#" className="text-primary">Ph.D</Link>
                      <p className="text-muted mt-4">
                        A gynecologist is a surgeon who specializes in the female reproductive system.
                      </p>
                      <h6>Specialties:</h6>
                      <ul className="list-unstyled mt-4">
                        {["Women's health services", "Pregnancy care", "Surgical procedures", "Specialty care"].map(
                          (spec, i) => (
                            <li className="mt-1 ms-0" key={i}>
                              <FiArrowRight className="text-primary" /> {spec}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {activeIndex === 2 && (
                    <div>
                      <h5>Experience</h5>
                      <p className="text-muted mt-4">20+ years experience...</p>
                      <div className="slider-range-four tiny-timeline mt-4">
                        <TinySlider settings={settings}>
                          {experienceData.map((item, index) => (
                            <div className="tiny-slide text-center" key={index}>
                              <div className="card border-0 p-4 item-box mb-2 shadow rounded">
                                <p className="text-muted mb-0">{item.time}</p>
                                <h6 className="mt-1">{item.title}</h6>
                                <p className="text-muted mb-0">{item.name}</p>
                              </div>
                            </div>
                          ))}
                        </TinySlider>
                      </div>
                    </div>
                  )}

                  {activeIndex === 3 && (
                    <div>
                      <div className="client-review-slider">
                        <TinySlider settings={settings2}>
                          {patientsData.map((item, index) => (
                            <div className="tiny-slide text-center" key={index}>
                              <p className="text-muted fw-normal fst-italic">{item.desc}</p>
                              <img src={item.image} className="img-fluid avatar avatar-small rounded-circle mx-auto shadow my-3" alt="" />
                              <h6 className="text-primary">{item.name} <small className="text-muted">{item.title}</small></h6>
                            </div>
                          ))}
                        </TinySlider>
                      </div>
                    </div>
                  )}

                  {activeIndex === 4 && (
                    <div className="card map border-0">
                      <div className="card-body p-0">
                        <iframe
                          src="https://www.google.com/maps/embed?...your-map-url..."
                          style={{ border: 0 }}
                          title="Map"
                          className="rounded"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}

                  {activeIndex === 5 && (
                    <>
                      <div className="d-flex justify-content-end mb-3">
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                          Set Up Availability
                        </button>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-md-12">
                          <div className="card border-0 p-3 rounded shadow">
                            <ul className="list-unstyled mb-0">
                              {availability.map(({ day, slots }, idx) => (
                                <li className="d-flex flex-column mt-2" key={idx}>
                                  <p className="text-muted mb-1 d-flex align-items-center">
                                    <RiTimeFill className="text-primary align-middle h5 mb-0 me-1" /> {day}
                                  </p>
                                  <div className="d-flex flex-wrap gap-2 ms-4">
                                    {slots.map((slot, i) => (
                                      <span
                                        key={i}
                                        className={`badge rounded-pill px-3 py-2 fw-semibold 
                                          ${slot.available
                                            ? "bg-success-subtle text-success border border-success"
                                            : "bg-danger-subtle text-danger border border-danger"
                                          }`}
                                      >
                                        {slot.time}
                                      </span>
                                    ))}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      {showModal && (
                        <div
                          className="modal fade show d-block"
                          tabIndex="-1"
                          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                          onClick={() => setShowModal(false)}
                        >
                          <div
                            className="modal-dialog modal-dialog-centered"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="modal-content p-4">
                              <h5 className="mb-3">Set Up Availability</h5>
                              <div className="mb-3">
                                <label className="form-label">Select Day</label>
                                <select
                                  className="form-select"
                                  value={selectedDay}
                                  onChange={handleDayChange}
                                >
                                  {availability.map(({ day }) => (
                                    <option key={day} value={day}>{day}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Select Time Slots</label>
                                <div className="d-flex flex-wrap gap-2">
                                  {currentDaySlots.map(({ time }) => (
                                    <button
                                      key={time}
                                      onClick={() => toggleSlot(time)}
                                      className={`btn btn-sm rounded-pill ${
                                        selectedSlots.includes(time)
                                          ? "btn-outline-success"
                                          : "btn-outline-danger"
                                      }`}
                                    >
                                      {time}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AdminFooter />
      <ScrollTop />
    </>
  );
}




















/*


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import profileImage from '../../assets/images/doctors/dr-profile.png';
import Navbar from "../../components/navbar";
import AdminFooter from "../../components/dashboard/adminFooter";
import ScrollTop from "../../components/scrollTop";

import {
  doctorData,
  experienceData,
  patientsData,
  partners,
} from "../../data/data";

import {
  FiHeart,
  RiMapPinLine,
  RiTimeLine,
  RiMoneyDollarCircleLine,
  FiFacebook,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiArrowRight,
  RiTimeFill,
  FiPhone,
  FiMail,
} from "../../assets/icons/vander";

import TinySlider from "tiny-slider-react";
import "tiny-slider/dist/tiny-slider.css";

// Mock service to fetch availability data
const fetchAvailabilityData = () => {
  return Promise.resolve([
    {
      day: "Monday",
      slots: [
        { time: "9:00 - 9:45", available: true },
        { time: "10:00 - 10:45", available: false },
        { time: "11:00 - 11:45", available: true },
        { time: "14:00 - 14:45", available: false },
        { time: "16:00 - 16:45", available: true },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        { time: "9:00 - 9:45", available: true },
        { time: "10:00 - 10:45", available: true },
        { time: "13:00 - 13:45", available: false },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        { time: "8:30 - 9:15", available: true },
        { time: "9:30 - 10:15", available: false },
        { time: "15:00 - 15:45", available: true },
      ],
    },
    {
      day: "Thursday",
      slots: [
        { time: "9:00 - 9:45", available: true },
        { time: "12:00 - 12:45", available: true },
        { time: "16:00 - 16:45", available: false },
      ],
    },
    {
      day: "Friday",
      slots: [
        { time: "10:00 - 10:45", available: true },
        { time: "13:00 - 13:45", available: true },
        { time: "17:00 - 17:45", available: false },
      ],
    },
    {
      day: "Saturday",
      slots: [
        { time: "9:00 - 9:45", available: false },
        { time: "11:00 - 11:45", available: true },
        { time: "12:30 - 13:15", available: true },
      ],
    },
    {
      day: "Sunday",
      slots: [
        { time: "10:00 - 10:45", available: true },
        { time: "11:30 - 12:15", available: false },
      ],
    },
  ]);
};

export default function DoctorProfile() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [availability, setAvailability] = useState([]);

  // New state for modal and form selections
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);

  useEffect(() => {
    fetchAvailabilityData().then((data) => {
      setAvailability(data);
      if (data.length > 0) {
        setSelectedDay(data[0].day);
        setSelectedSlots(
          data[0].slots.filter(slot => slot.available).map(slot => slot.time)
        );
      }
    });
  }, []);

  // Handle day select change in modal
  const handleDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day);
    const dayData = availability.find(a => a.day === day);
    if(dayData){
      setSelectedSlots(dayData.slots.filter(slot => slot.available).map(slot => slot.time));
    } else {
      setSelectedSlots([]);
    }
  };

  // Toggle slot availability on button click
  const toggleSlot = (time) => {
    setSelectedSlots((prev) =>
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    );
  };

  // Save availability changes to state
  const handleSave = () => {
    setAvailability((prev) => {
      return prev.map(dayObj => {
        if (dayObj.day === selectedDay) {
          return {
            ...dayObj,
            slots: dayObj.slots.map(slot => ({
              ...slot,
              available: selectedSlots.includes(slot.time),
            })),
          };
        }
        return dayObj;
      });
    });
    setShowModal(false);
  };

  // Slots for currently selected day in modal
  const currentDaySlots = availability.find(d => d.day === selectedDay)?.slots || [];

  const settings = {
    container: ".slider-range-four",
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
      992: { items: 4 },
      767: { items: 2 },
      320: { items: 1 },
    },
  };

  const settings2 = {
    container: ".client-review-slider",
    items: 1,
    controls: false,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    speed: 400,
    gutter: 16,
  };

  return (
    <>
      <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container" />
      <section className="bg-dashboard my-lg-5">
        <div className="container mt-xl-5">
        
          <div className="row">
            <div className="col-12">
              <div className="card border-0 rounded shadow">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-5 position-relative">
                    <img src={profileImage} className="img-fluid dr-profile-img" alt="" />
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-7">
                    <div className="p-lg-5 p-4">
                      <small className="text-muted">25th December, 2020 - 5:00PM</small>
                      <h4 className="my-3">
                        Good Morning ! <br /> <span className="text-primary h2">Dr. Christopher Burrell</span>
                      </h4>
                      <p className="para-desc text-muted">
                        Great doctor if you need your family member to get effective immediate assistance, emergency
                        treatment or a simple consultation.
                      </p>
                      <h6 className="mb-0">
                        You have <span className="text-primary">18 patients</span> remaining today!
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

       
          <div className="row">
            <div className="col-12 mt-4 pt-2">
              <div className="card border-0 shadow rounded p-4">
                <ul className="nav nav-pills nav-justified flex-column flex-sm-row rounded shadow overflow-hidden bg-light">
                  {["Overview", "Experience", "Reviews", "Location", "Time Table"].map((label, i) => (
                    <li className="nav-item" key={i}>
                      <Link
                        className={`${activeIndex === i + 1 ? "active" : ""} nav-link rounded-0`}
                        to="#"
                        onClick={() => setActiveIndex(i + 1)}
                      >
                        <div className="text-center pt-1 pb-1">
                          <h5 className="mb-0">{label}</h5>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

               
                <div className="tab-content mt-4">
                  
                  {activeIndex === 1 && (
                    <div className="tab-pane fade show active">
                      <h5 className="mb-1">Dr. Christopher Burrell</h5>
                      <Link to="#" className="text-primary">Gynecologist</Link>, &nbsp;
                      <Link to="#" className="text-primary">Ph.D</Link>
                      <p className="text-muted mt-4">
                        A gynecologist is a surgeon who specializes in the female reproductive system...
                      </p>
                      <h6>Specialties:</h6>
                      <ul className="list-unstyled mt-4">
                        {[
                          "Women's health services",
                          "Pregnancy care",
                          "Surgical procedures",
                          "Specialty care",
                          "Conclusion",
                        ].map((spec, i) => (
                          <li className="mt-1 ms-0" key={i}>
                            <FiArrowRight className="text-primary" /> {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                 
                  {activeIndex === 2 && (
                    <div className="tab-pane fade show active">
                      <h5 className="mb-1">Experience:</h5>
                      <p className="text-muted mt-4">Lorem Ipsum dummy text...</p>
                      <h6>Professional Experience:</h6>
                      <div className="slider-range-four tiny-timeline mt-4">
                        <TinySlider settings={settings}>
                          {experienceData.map((item, index) => (
                            <div className="tiny-slide text-center" key={index}>
                              <div className="card border-0 p-4 item-box mb-2 shadow rounded">
                                <p className="text-muted mb-0">{item.time}</p>
                                <h6 className="mt-1">{item.title}</h6>
                                <p className="text-muted mb-0">{item.name}</p>
                              </div>
                            </div>
                          ))}
                        </TinySlider>
                      </div>
                    </div>
                  )}

                  
                  {activeIndex === 3 && (
                    <div className="tab-pane fade show active">
                      <div className="row justify-content-center">
                        <div className="col-lg-8 mt-4 pt-2 text-center">
                          <div className="client-review-slider">
                            <TinySlider settings={settings2}>
                              {patientsData.map((item, index) => (
                                <div className="tiny-slide text-center" key={index}>
                                  <p className="text-muted fw-normal fst-italic">{item.desc}</p>
                                  <img
                                    src={item.image}
                                    className="img-fluid avatar avatar-small rounded-circle mx-auto shadow my-3"
                                    alt=""
                                  />
                                  <ul className="list-unstyled mb-0">
                                    {[...Array(5)].map((_, i) => (
                                      <li className="list-inline-item" key={i}>
                                        <i className="mdi mdi-star text-warning"></i>
                                      </li>
                                    ))}
                                  </ul>
                                  <h6 className="text-primary">
                                    {item.name} <small className="text-muted">{item.title}</small>
                                  </h6>
                                </div>
                              ))}
                            </TinySlider>
                          </div>
                        </div>
                      </div>

                      <div className="row justify-content-center">
                        {partners.map((item, index) => (
                          <div className="col-lg-2 col-md-2 col-6 text-center py-4" key={index}>
                            <img src={item} className="avatar avatar-client" alt="" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  
                  {activeIndex === 4 && (
                    <div className="tab-pane fade show active">
                      <div className="card map border-0">
                        <div className="card-body p-0">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!...your-map-embed-url..."
                            style={{ border: "0" }}
                            title="doctris"
                            className="rounded"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  )}

                  
                  {activeIndex === 5 && (
                    <>
                      <div className="d-flex justify-content-end mb-3">
                        <button
                          className="btn btn-primary"
                          onClick={() => setShowModal(true)}
                        >
                          Set Up Availability
                        </button>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-md-12">
                          <div className="card border-0 p-3 rounded shadow">
                            <ul className="list-unstyled mb-0">
                              {availability.map(({ day, slots }, idx) => (
                                <li className="d-flex flex-column mt-2" key={idx}>
                                  <p className="text-muted mb-1 d-flex align-items-center">
                                    <RiTimeFill className="text-primary align-middle h5 mb-0 me-1" /> {day}
                                  </p>
                                  <div className="d-flex flex-wrap gap-2 ms-4">
                                    {slots.map((slot, i) => (
                                      <span
                                        key={i}
                                        className={`badge rounded-pill px-3 py-2 fw-semibold 
                                          ${
                                            slot.available
                                              ? "bg-success-subtle text-success border border-success"
                                              : "bg-danger-subtle text-danger border border-danger"
                                          }`}
                                      >
                                        {slot.time}
                                      </span>
                                    ))}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                       
                        <div className="col-lg-4 col-md-6 mt-4 mt-lg-0 pt-2 pt-lg-0">
                          <div className="card border-0 text-center features feature-primary">
                            <div className="icon text-center mx-auto rounded-md">
                              <span className="mb-0">
                                <FiPhone className="h3" />
                              </span>
                            </div>
                            <div className="card-body p-0 mt-4">
                              <h5 className="title fw-bold">Phone</h5>
                              <p className="text-muted">Great doctor for immediate assistance</p>
                              <Link to="tel:+152534-468-854" className="link">
                                +152 534-468-854
                              </Link>
                            </div>
                          </div>
                        </div>

                    
                        <div className="col-lg-4 col-md-6 mt-4 mt-lg-0 pt-2 pt-lg-0">
                          <div className="card border-0 text-center features feature-primary">
                            <div className="icon text-center mx-auto rounded-md">
                              <span className="mb-0">
                                <FiMail className="h3" />
                              </span>
                            </div>
                            <div className="card-body p-0 mt-4">
                              <h5 className="title fw-bold">Email</h5>
                              <p className="text-muted">Need a consultation? Reach out.</p>
                              <Link to="mailto:contact@example.com" className="link">
                                contact@example.com
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {showModal && (
                        <div
                          className="modal fade show d-block"
                          tabIndex="-1"
                          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                          onClick={() => setShowModal(false)}
                        >
                          <div
                            className="modal-dialog modal-dialog-centered"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="modal-content p-4">
                              <h5 className="mb-3">Set Up Availability</h5>
                              <div className="mb-3">
                                <label className="form-label">Select Day</label>
                                <select
                                  className="form-select"
                                  value={selectedDay}
                                  onChange={handleDayChange}
                                >
                                  {availability.map(({ day }) => (
                                    <option key={day} value={day}>{day}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Select Time Slots</label>
                                <div className="d-flex flex-wrap gap-2">
                                  {currentDaySlots.length === 0 && <p>No time slots available for this day.</p>}
                                  {currentDaySlots.map(({ time }) => {
                                    const isAvailable = selectedSlots.includes(time);
                                    return (
                                      <button
                                        key={time}
                                        type="button"
                                        onClick={() => toggleSlot(time)}
                                        className={`btn btn-sm rounded-pill ${
                                          isAvailable
                                            ? "btn-outline-success"
                                            : "btn-outline-danger"
                                        }`}
                                        style={{
                                          minWidth: "100px",
                                          userSelect: "none",
                                          cursor: "pointer",
                                        }}
                                        aria-pressed={isAvailable}
                                      >
                                        {time}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="d-flex justify-content-end gap-2">
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => setShowModal(false)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="btn btn-primary"
                                  onClick={handleSave}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AdminFooter />
      <ScrollTop />
    </>
  );
}
*/