import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import AdminFooter from "../../components/dashboard/adminFooter";
import ScrollTop from "../../components/scrollTop";

import { patientsData2 } from "../../data/data";
import {FaEllipsisH, FiUser, FiSettings,FiTrash} from '../../assets/icons/vander'

export default function PatientList(){
    let [show, setShow] = useState('')

    useEffect(()=>{
        const modalClose =()=>{
            setShow(false)
        }
        document.addEventListener("mousedown", modalClose);
        return ()=>{
            document.removeEventListener("mousedown", modalClose);
        }
    },[])

    let handleShow =(id)=>{
        setShow(id)
    }
    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container-fluid"/>
        <section className="bg-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <Sidebar colClass="col-xl-3 col-lg-4 col-md-5 col-12"/>

                    <div className="col-xl-9 col-lg-8 col-md-7 mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <h5 className="mb-0">Patients List</h5>
                        <div className="row">
                            {patientsData2.map((item, index) =>{
                                return(
                                    <div className="col-xl-3 col-lg-6 col-12 mt-4 pt-2" key={index}>
                                        <div className="card border-0 shadow rounded p-4">
                                            <div className="d-flex justify-content-between">
                                                <img src={item.image} className="avatar avatar-md-md rounded-pill shadow" alt=""/>
                                                
                                                <div className="dropdown dropdown-primary">
                                                    <button type="button" className="btn btn-icon btn-pills btn-soft-primary dropdown-toggle p-0" onClick={()=>handleShow(item.id)} ><FaEllipsisH /></button>
                                                    <div className={`${show === item.id ? 'show' : ''} dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3`} style={{right:'0'}}>
                                                        <Link className="dropdown-item text-dark mb-1" to="#"><span className="mb-0 d-inline-flex align-items-center me-1"><FiUser className="align-middle h6 mb-0"/></span> Profile</Link>
                                                        <Link className="dropdown-item text-dark mb-1" to="#"><span className="mb-0 d-inline-flex align-items-center me-1"><FiSettings className="align-middle h6 mb-0"/></span> Profile Settings</Link>
                                                        <Link className="dropdown-item text-dark" to="#"><span className="mb-0 d-inline-flex align-items-center me-1"><FiTrash className="align-middle h6 mb-0"/></span> Delete</Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card-body p-0 pt-3">
                                                <Link to="#" className="text-dark h6">{item.name}</Link>
                                                <p className="text-muted">{item.id}</p>
                                                
                                                <ul className="mb-0 list-unstyled mt-2">
                                                    <li className="mt-1 ms-0"><span className="text-muted me-2">Gender:</span>{item.gender}</li>
                                                    <li className="mt-1 ms-0"><span className="text-muted me-2">Age:</span>{item.Age}</li>
                                                    <li className="mt-1 ms-0"><span className="text-muted me-2">Country:</span>{item.country}</li>
                                                    <li className="mt-1 ms-0"><span className="text-muted me-2">Diagnosis:</span>{item.Diagnosis}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="row text-center">
                            <div className="col-12 mt-4 pt-2">
                                <ul className="pagination justify-content-center mb-0 list-unstyled">
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
        </section>
        <AdminFooter/>
        <ScrollTop/>
        </>
    )
}