import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Chart from "../../components/dashboard/chart";
import ReviewOne from "../../components/review/reviewOne";
import AdminFooter from "../../components/dashboard/adminFooter";
import ScrollTop from "../../components/scrollTop";

import { latestAppointment, upcomingAppointment, partners, adminFeature } from "../../data/data";

import {FiCalendar, FiArrowRight, RiCalendar2Line} from '../../assets/icons/vander'

export default function DoctorDashBoard(){
    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container-fluid"/>
        <section className="bg-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <Sidebar colClass ="col-xl-3 col-lg-4 col-md-5 col-12"/>
                    <div className="col-xl-9 col-lg-8 col-md-7 mt-4 mt-sm-0">
                        <h5 className="mb-0">Dashboard</h5>
                        <Chart/>

                        <div className="row">
                            <div className="col-xl-4 col-lg-6 mt-4">
                                <div className="card border-0 shadow rounded">
                                    <div className="d-flex justify-content-between p-4 border-bottom">
                                        <h6 className="mb-0 d-flex align-items-center"><FiCalendar className="text-primary me-2 h5 mb-0"/> Latest Appointment</h6>
                                        <h6 className="text-muted mb-0">55 Patients</h6>
                                    </div>

                                    <ul className="list-unstyled mb-0 p-4 pt-0">
                                        {latestAppointment.map((item,index) =>{
                                            return(
                                                <li className="pt-4 ms-0" key={index}>
                                                    <Link to="#">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-inline-flex">
                                                                <img src={item.image} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                                <div className="ms-3">
                                                                    <h6 className="text-dark mb-0 d-block">{item.name}</h6>
                                                                    <small className="text-muted">{item.date}</small>
                                                                </div>
                                                            </div>
                                                            <FiArrowRight className="h5 text-dark"/>
                                                        </div>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-6 mt-4">
                                <div className="card border-0 shadow rounded">
                                    <div className="d-flex justify-content-between p-4 border-bottom">
                                        <h6 className="mb-0"><RiCalendar2Line className="text-primary me-1 h5 mb-0"/> Upcoming Appointment</h6>
                                        <h6 className="text-muted mb-0">55 Patients</h6>
                                    </div>

                                    <ul className="list-unstyled mb-0 p-4 pt-0">
                                        {upcomingAppointment.map((item,index)=>{
                                            return(
                                                <li className="mt-4 ms-0" key={index}>
                                                    <Link to="#">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-inline-flex">
                                                                <img src={item.image} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                                <div className="ms-3">
                                                                    <h6 className="text-dark mb-0 d-block">{item.name}</h6>
                                                                    <small className="text-muted">{item.date}</small>
                                                                </div>
                                                            </div>
                                                            <FiArrowRight className="h5 text-dark"/>
                                                        </div>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-12 mt-4">
                                <div className="card border-0 shadow rounded">
                                    <div className="p-4 border-bottom">
                                        <h6 className="mb-0">Patient's Review</h6>
                                    </div>

                                    <div className="p-4">
                                       <ReviewOne/>

                                        <div className="row justify-content-center mt-3">
                                            {partners.slice(0,4).map((item,index) =>{
                                                return(
                                                    <div className="col-md col-6 text-center pt-3" key={index}>
                                                        <img src={item} className="avatar avatar-client" alt=""/>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {adminFeature.map((item,index) =>{
                                let Icon = item.icon
                                return(
                                    <div className="col-xl-3 col-md-6 mt-4" key={index}>
                                        <div className="card features feature-primary text-center border-0 p-4 rounded shadow">
                                            <div className="icon text-center rounded-lg mx-auto">
                                                <Icon className="align-middle h3 mb-0"/>
                                            </div>
                                            <div className="card-body p-0 mt-3">
                                                <Link to="#" className="title text-dark h5">{item.title}</Link>
                                                <p className="text-muted my-2">{item.desc}</p>
                                                <Link to="#" className="link">Read more <FiArrowRight className="align-middle"/></Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <AdminFooter/>
        <ScrollTop/>
        </>
    )
}