import React from "react";
import { Link, useLocation } from "react-router-dom";
import client1 from '../../../Landing/src/assets/images/hero.png'; // Keep if image exists inside src/assets/images/client/
import { 
  RiPagesLine, RiUserSettingsLine, RiEmpathizeLine, RiChatVoiceLine 
} from "react-icons/ri";

export default function PatientSidebar() {
  const location = useLocation();

  return (
    <div className="col-xl-3 col-lg-4 col-md-5 col-12">
      <div className="card border-0 p-4 rounded shadow overflow-hidden sticky-bar">
        <div className="d-md-flex text-center text-md-start align-items-center">
          <img 
            src={client1} 
            className="avatar avatar-md-md rounded-circle border shadow" 
            alt="Patient Avatar" 
          />
          <div className="ms-md-3 mt-3 mt-sm-0">
            <h5 className="mb-1">Christopher Burrell</h5>
            <small className="text-muted">25 Years old</small>
          </div>
        </div>

        <span className="bg-soft-success p-2 rounded-pill text-center h6 mb-0 mt-4 d-block">
          Healthy
        </span>

        <div className="row">
          <div className="col-4 mt-4 text-center">
            <span className="h6 text-muted">Blood</span>
            <h6 className="mb-0 fw-normal">B+</h6>
          </div>
          <div className="col-4 mt-4 text-center">
            <span className="h6 text-muted">Height</span>
            <h6 className="mb-0 fw-normal">175 cm</h6>
          </div>
          <div className="col-4 mt-4 text-center">
            <span className="h6 text-muted">Weight</span>
            <h6 className="mb-0 fw-normal">64 kg</h6>
          </div>
        </div>

        {/* Sidebar navigation */}
        <ul className="list-unstyled sidebar-nav mb-0 mt-4">
          <li className={`${location.pathname === '/invoices' ? 'active' : ''} navbar-item mb-2`}>
            <Link to="/invoices" className="navbar-link">
              <RiPagesLine className="align-middle navbar-icon" /> Orders
            </Link>
          </li>

          <li className={`${location.pathname === '/doctor-profile-setting' ? 'active' : ''} navbar-item mb-2`}>
            <Link to="/doctor-profile-setting" className="navbar-link">
              <RiUserSettingsLine className="align-middle navbar-icon" /> Profile Settings
            </Link>
          </li>

          <li className={`${location.pathname === '/patient-list' ? 'active' : ''} navbar-item mb-2`}>
            <Link to="/patient-list" className="navbar-link">
              <RiEmpathizeLine className="align-middle navbar-icon" /> Meetings
            </Link>
          </li>

          <li className={`${location.pathname === '/dashboard/patient-chat' ? 'active' : ''} navbar-item mb-2`}>
            <Link to="/dashboard/patient-chat" className="navbar-link">
              <RiChatVoiceLine className="align-middle navbar-icon" /> Chat
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
