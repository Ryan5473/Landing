import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import bg1 from '../assets/images/bg/bg-lines-one.png';
import logoDark from '../assets/images/logo-dark.png';
import { FiHome } from 'react-icons/fi'; // correct usage
import { FaSquareFacebook } from 'react-icons/fa6';

export default function Signup() {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/users/register", form);
            alert("Registration successful!");
            navigate("/login");
        } catch (err) {
            alert("Signup failed: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <>
            <div className="back-to-home rounded d-none d-sm-block">
                <Link to="/" className="btn btn-icon btn-primary"><FiHome className="icons" /></Link>
            </div>

            <section className="bg-home d-flex bg-light align-items-center" style={{ backgroundImage: `url(${bg1})`, backgroundPosition: 'center' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-8">
                            <img src={logoDark} height="22" className="mx-auto d-block" alt="logo" />
                            <div className="card login-page shadow mt-4 rounded border-0">
                                <div className="card-body">
                                    <h4 className="text-center">Sign Up</h4>
                                    <form className="login-form mt-4" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12 mb-3">
                                                <label className="form-label">Username</label>
                                                <input type="text" className="form-control" name="username" value={form.username} onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label className="form-label">Password</label>
                                                <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-12">
                                                <div className="d-grid">
                                                    <button className="btn btn-primary">Register</button>
                                                </div>
                                            </div>
                                            <div className="col-12 text-center mt-3">
                                                <p className="mb-0"><small className="text-dark me-2">Already have an account?</small><Link to="/login" className="text-dark fw-bold">Sign in</Link></p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
