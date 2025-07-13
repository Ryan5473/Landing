import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import bg1 from '../../assets/images/bg/bg-chat.png'
import logoDark from '../../assets/images/logo-dark.png'

import Navbar from "../../components/navbar";
import PatientSidebar from "../../components/patientSidebar";

import AdminFooter from "../../components/dashboard/adminFooter";
import ScrollTop from "../../components/scrollTop";

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import client from '../../assets/images/client/09.jpg'
import doctor from '../../assets/images/doctors/02.jpg'

import Modal from 'react-bootstrap/Modal';

import { MonthlyReport, adminFeature, appointment, paymentTwo } from "../../data/data";

import {LuClipboardList,FaEllipsisH, MdOutlineLibraryAdd, FiTrash, BiSend, FaRegSmile, FiPaperclip, FiClock,FiUser, FiSettings, FiArrowRight} from '../../assets/icons/vander'

export default function PatientDashboard(){
    let [open, setOpen] = useState(false)
    let [open2, setOpen2] = useState(false)
    let [show, setShow] = useState(false);
    let [chatSetting, setChatSetting] = useState(false);

    useEffect(()=>{
        let closeModal = ()=>{
            setOpen(false)
        }
        let closeModal2 = ()=>{
            setOpen2(false)
        }
        let closeModal3 = ()=>{
            setChatSetting(false)
        }
        document.addEventListener("mousedown", closeModal);
        document.addEventListener("mousedown", closeModal2);
        document.addEventListener("mousedown", closeModal3);
        return ()=>{
            document.removeEventListener("mousedown", closeModal);
            document.removeEventListener("mousedown", closeModal2);
            document.removeEventListener("mousedown", closeModal3);
        }
    },[])
    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container-fluid"/>

        <section className="bg-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <PatientSidebar/>

                   
                </div>
            </div>
        </section>
        <AdminFooter/>
        <ScrollTop/>
        </>
    )
}