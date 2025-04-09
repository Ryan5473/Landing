import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import AddApointment from "../../components/dashboard/addAppointment";
import Crud from "../../components/dashboard/crud";
import AdminFooter from "../../components/dashboard/adminFooter";
import ScrollTop from "../../components/scrollTop";

import { appointmentData } from "../../data/data";

export default function DoctorAppointment(){
    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container-fluid"/>
        <section className="bg-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <Sidebar colClass ="col-xl-3 col-lg-4 col-md-5 col-12"/>

                    <div className="col-xl-9 col-lg-8 col-md-7 mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <div className="row">
                            <div className="col-xl-9 col-lg-6 col-md-4">
                                <h5 className="mb-0">Appointment</h5>
                            </div>

                            <div className="col-xl-3 col-lg-6 col-md-8 mt-4 mt-md-0">
                                <div className="justify-content-md-end">
                                    <form>
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-sm-12 col-md-5">
                                                <div className="mb-0 position-relative">
                                                    <select className="form-select form-control">
                                                        <option value="EY">Today</option>
                                                        <option value="GY">Tomorrow</option>
                                                        <option value="PS">Yesterday</option>
                                                    </select>
                                                </div>
                                            </div>
                                           <AddApointment/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-12 mt-4">
                                <div className="table-responsive bg-white shadow rounded">
                                    <table className="table mb-0 table-center">
                                        <thead>
                                            <tr>
                                                <th className="border-bottom p-3" style={{minWidth:'50px'}}>#</th>
                                                <th className="border-bottom p-3" style={{minWidth:'180px'}}>Name</th>
                                                <th className="border-bottom p-3">Age</th>
                                                <th className="border-bottom p-3">Gender</th>
                                                <th className="border-bottom p-3">Department</th>
                                                <th className="border-bottom p-3" style={{minWidth:'150px'}}>Date</th>
                                                <th className="border-bottom p-3">Time</th>
                                                <th className="border-bottom p-3" style={{minWidth:'220px'}}>Doctor</th>
                                                <th className="border-bottom p-3">Fees</th>
                                                <th className="border-bottom p-3" style={{minWidth:'150px'}}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointmentData.map((item, index) =>{
                                                return(
                                                    <tr key={index}>
                                                        <th className="p-3">{item.id}</th>
                                                        <td className="p-3">
                                                            <Link to="#" className="text-dark">
                                                                <div className="d-flex align-items-center">
                                                                    <img src={item.clientImage} className="avatar avatar-md-sm rounded-circle shadow" alt=""/>
                                                                    <span className="ms-2">{item.clientName}</span>
                                                                </div>
                                                            </Link>
                                                        </td>
                                                        <td className="p-3">{item.age}</td>
                                                        <td className="p-3">{item.gender}</td>
                                                        <td className="p-3">{item.department}</td>
                                                        <td className="p-3">{item.date}</td>
                                                        <td className="p-3">{item.time}</td>
                                                        <td className="p-3">
                                                            <Link to="#" className="text-dark">
                                                                <div className="d-flex align-items-center">
                                                                    <img src={item.drImage} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                                    <span className="ms-2">{item.drName}</span>
                                                                </div>
                                                            </Link>
                                                        </td>
                                                        <td className="p-3">{item.fees}</td>
                                                        <Crud/>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="row text-center">
                            
                            <div className="col-12 mt-4">
                                <div className="d-md-flex align-items-center text-center justify-content-between">
                                    <span className="text-muted me-3">Showing 1 - 10 out of 50</span>
                                    <ul className="pagination justify-content-center mb-0 mt-3 mt-sm-0">
                                        <li className="page-item"><Link className="page-link" to="#" aria-label="Previous">Prev</Link></li>
                                        <li className="page-item active"><Link className="page-link" to="#">1</Link></li>
                                        <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                        <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                        <li className="page-item"><Link className="page-link" to="#" aria-label="Next">Next</Link></li>
                                    </ul>
                                </div>
                            </div>
                            
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