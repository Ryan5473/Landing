import React from "react";
import { Link, useLocation} from "react-router-dom";

import bg1 from '../assets/images/doctors/profile-bg.jpg'
import dr1 from '../assets/images/doctors/01.jpg'

import {RiCalendarCheckLine,RiTimerLine, RiPagesLine} from '../assets/icons/vander'

export default function Sidebarph({colClass}){
    let location = useLocation()
   
    
    return(
        <>
        <div className={colClass}>
            <div className="rounded shadow overflow-hidden sticky-bar">
                <div className="card border-0">
                    <img src={bg1} className="img-fluid" alt=""/>
                </div>

                <div className="text-center avatar-profile margin-nagative mt-n5 position-relative pb-4 border-bottom">
                    <img src={dr1} className="rounded-circle shadow-md avatar avatar-md-md" alt=""/>
                    <h5 className="mt-3 mb-1">pharmacy Admin</h5>
                    
                </div>

                <ul className="list-unstyled sidebar-nav mb-0">
                    
                    <li className={`${location.pathname === '/doctor-appointment'? 'active' : ''} navbar-item mb-2`}><Link to="/doctor-appointment" className="navbar-link"><RiCalendarCheckLine className="align-middle navbar-icon"/> products</Link></li>
                    <li className={`${location.pathname === '/doctor-schedule'? 'active' : ''} navbar-item mb-2`}><Link to="/doctor-schedule" className="navbar-link"><RiTimerLine className="align-middle navbar-icon"/> orders</Link></li>
                    <li className={`${location.pathname === '/invoices'? 'active' : ''} navbar-item mb-2`}><Link to="/invoices" className="navbar-link"><RiPagesLine className="align-middle navbar-icon"/> user  notifies</Link></li>
                   
                   

                </ul>
            </div>
        </div>
        </>
    )
}