import React, { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ScrollTop from "../../components/scrollTop";
import  {  useRef, useEffect } from "react";


export default function BookingAppointment(){
    const [showTimeOptions, setShowTimeOptions] = useState(false);
    const [selectedTime, setSelectedTime] = useState("");
    const timeRef = useRef(null);

    const timeSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
        "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
        "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
        "05:00 PM"
    ];

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        setShowTimeOptions(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (timeRef.current && !timeRef.current.contains(event.target)) {
                setShowTimeOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container" />

            <section className="bg-half-170 d-table w-100 bg-light">
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <h3 className="sub-title mb-4">Book an appointment</h3>
                                <p className="para-desc mx-auto text-muted">
                                    Great doctor if you need your family member to get effective immediate assistance,
                                    emergency treatment or a simple consultation.
                                </p>
                                <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                                    <ul className="breadcrumb bg-transparent mb-0 py-1">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Doctris</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Appointment</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="position-relative">
                <div className="shape overflow-hidden text-color-white">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor" />
                    </svg>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow rounded overflow-hidden">
                                <div className="p-4">
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <label className="form-label">Patient Name <span className="text-danger">*</span></label>
                                                <input name="name" type="text" className="form-control" placeholder="Patient Name" />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Departments</label>
                                                <select className="form-select form-control">
                                                    <option>Eye Care</option>
                                                    <option>Gynecologist</option>
                                                    <option>Psychotherapist</option>
                                                    <option>Orthopedic</option>
                                                    <option>Dentist</option>
                                                    <option>Gastrologist</option>
                                                    <option>Urologist</option>
                                                    <option>Neurologist</option>
                                                </select>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Doctor</label>
                                                <select className="form-select form-control">
                                                    <option>Dr. Calvin Carlo</option>
                                                    <option>Dr. Cristino Murphy</option>
                                                    <option>Dr. Alia Reddy</option>
                                                    <option>Dr. Toni Kovar</option>
                                                    <option>Dr. Jessica McFarlane</option>
                                                    <option>Dr. Elsie Sherman</option>
                                                    <option>Dr. Bertha Magers</option>
                                                    <option>Dr. Louis Batey</option>
                                                </select>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Your Email <span className="text-danger">*</span></label>
                                                <input name="email" type="email" className="form-control" placeholder="Your email" />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Your Phone <span className="text-danger">*</span></label>
                                                <input name="phone" type="tel" className="form-control" placeholder="Your phone" />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Date</label>
                                                <input name="date" type="date" className="form-control" />
                                            </div>

                                            <div className="col-md-6 mb-3 position-relative" ref={timeRef}>
                                                <label className="form-label">Time available</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Select time"
                                                    onFocus={() => setShowTimeOptions(true)}
                                                    value={selectedTime}
                                                    readOnly
                                                />
                                                {showTimeOptions && (
                                                    <div className="border rounded bg-white position-absolute w-100 shadow" style={{
                                                        maxHeight: "200px",
                                                        overflowY: "auto",
                                                        zIndex: 1000
                                                    }}>
                                                        {timeSlots.map((time, idx) => (
                                                            <div
                                                                key={idx}
                                                                onClick={() => handleTimeSelect(time)}
                                                                className="px-3 py-2"
                                                                style={{ cursor: "pointer", backgroundColor: selectedTime === time ? "#f1f1f1" : "white" }}
                                                            >
                                                                {time}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="col-lg-12 mb-3">
                                                <label className="form-label">Comments <span className="text-danger">*</span></label>
                                                <textarea name="comments" rows="4" className="form-control" placeholder="Your message"></textarea>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="d-grid">
                                                    <button type="submit" className="btn btn-primary">Book An Appointment</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
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
}