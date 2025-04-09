import React from "react";
import { Link } from "react-router-dom";

import image1 from  '../../assets/images/doctors/01.jpg'

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import AdminFooter from "../../components/dashboard/adminFooter";

export default function DoctorProfileSettimg(){
    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container"/>
        <section className="bg-dashboard">
            <div className="container">
                <div className="row justify-content-center">
                    <Sidebar colClass ="col-xl-4 col-lg-4 col-md-5 col-12"/>

                    <div className="col-xl-8 col-lg-8 col-md-7 mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <h5 className="mb-0 pb-2">Schedule Timing</h5>
                        <div className="rounded shadow mt-4">
                            <div className="p-4 border-bottom">
                                <h5 className="mb-0">Personal Information :</h5>
                            </div>

                            <div className="p-4 border-bottom">
                                <div className="row align-items-center">
                                    <div className="col-lg-2 col-md-4">
                                        <img src={image1} className="avatar avatar-md-md rounded-pill shadow mx-auto d-block" alt=""/>
                                    </div>

                                    <div className="col-lg-5 col-md-8 text-center text-md-start mt-4 mt-sm-0">
                                        <h5 className="">Upload your picture</h5>
                                        <p className="text-muted mb-0">For best results, use an image at least 256px by 256px in either .jpg or .png format</p>
                                    </div>

                                    <div className="col-lg-5 col-md-12 text-lg-end text-center mt-4 mt-lg-0">                                        
                                        <Link to="#" className="btn btn-primary">Upload</Link>
                                        <Link to="#" className="btn btn-soft-primary ms-2">Remove</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">First Name</label>
                                                <input name="name" id="name" type="text" className="form-control" placeholder="First Name :"/>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Last Name</label>
                                                <input name="name" id="name2" type="text" className="form-control" placeholder="Last Name :"/>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Your Email</label>
                                                <input name="email" id="email" type="email" className="form-control" placeholder="Your email :"/>
                                            </div> 
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Phone no.</label>
                                                <input name="number" id="number" type="text" className="form-control" placeholder="Phone no. :"/>
                                            </div>                                                                               
                                        </div>

                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Your Bio Here</label>
                                                <textarea name="comments" id="comments" rows="4" className="form-control" placeholder="Bio :"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <input type="submit" id="submit" name="send" className="btn btn-primary" value="Save changes"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="rounded shadow mt-4">
                            <div className="p-4 border-bottom">
                                <h5 className="mb-0">Change Password :</h5>
                            </div>

                            <div className="p-4">
                                <form>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Old password :</label>
                                                <input type="password" className="form-control" placeholder="Old password" required=""/>
                                            </div>
                                        </div>
    
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">New password :</label>
                                                <input type="password" className="form-control" placeholder="New password" required=""/>
                                            </div>
                                        </div>
    
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">Re-type New password :</label>
                                                <input type="password" className="form-control" placeholder="Re-type New password" required=""/>
                                            </div>
                                        </div>
    
                                        <div className="col-lg-12 mt-2 mb-0">
                                            <button className="btn btn-primary">Save password</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="rounded shadow mt-4">
                            <div className="p-4 border-bottom">
                                <h5 className="mb-0">Account Notifications :</h5>
                            </div>

                            <div className="p-4">
                                <div className="d-flex justify-content-between pb-4">
                                    <h6 className="mb-0 fw-normal">When someone mentions me</h6>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" value="" id="customSwitch1"/>
                                        <label className="form-check-label" htmlFor="customSwitch1"></label>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between py-4 border-top">
                                    <h6 className="mb-0 fw-normal">When someone follows me</h6>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="customSwitch2" defaultChecked/>
                                        <label className="form-check-label" htmlFor="customSwitch2"></label>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between py-4 border-top">
                                    <h6 className="mb-0 fw-normal">When shares my activity</h6>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="customSwitch3"/>
                                        <label className="form-check-label" htmlFor="customSwitch3"></label>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between py-4 border-top">
                                    <h6 className="mb-0 fw-normal">When someone messages me</h6>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="customSwitch4" defaultChecked/>
                                        <label className="form-check-label" htmlFor="customSwitch4"></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded shadow mt-4">
                            <div className="p-4 border-bottom">
                                <h5 className="mb-0">Marketing Notifications :</h5>
                            </div>

                            <div className="p-4">
                                <div className="d-flex justify-content-between pb-4">
                                    <h6 className="mb-0 fw-normal">There is a sale or promotion</h6>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="customSwitch5" defaultChecked/>
                                        <label className="form-check-label" htmlFor="customSwitch5"></label>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between py-4 border-top">
                                    <h6 className="mb-0 fw-normal">Company news</h6>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="customSwitch6"/>
                                        <label className="form-check-label" htmlFor="customSwitch6"></label>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between py-4 border-top">
                                    <h6 className="mb-0 fw-normal">Weekly jobs</h6>
                                    <div className="form-check"> 
                                        <input type="checkbox" className="form-check-input" id="customSwitch7"/>
                                        <label className="form-check-label" htmlFor="customSwitch7"></label>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between py-4 border-top">
                                    <h6 className="mb-0 fw-normal">Unsubscribe News</h6>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="customSwitch8" defaultChecked/>
                                        <label className="form-check-label" htmlFor="customSwitch8"></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded shadow mt-4">
                            <div className="p-4 border-bottom">
                                <h5 className="mb-0 text-danger">Delete Account :</h5>
                            </div>

                            <div className="p-4">
                                <h6 className="mb-0 fw-normal">Do you want to delete the account? Please press below "Delete" button</h6>
                                <div className="mt-4">
                                    <button className="btn btn-danger">Delete Account</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <AdminFooter/>
        </>
    )
}