import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import api_uri from "../uri";
import NavBar from "./NavBar";
import "../public/login.css";

function LoginForm() {
    const [formData, setFormData] = useState({
        role: "adm",
        email: "",
        password: ""
    });
    const Navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const waitingToast = toast.info('Logging in, please wait...', {
            position: 'top-center',
            autoClose: false,
        });

        try {
            const response = await axios.post(api_uri + '/login', formData);
            toast.dismiss(waitingToast);

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('Role', response.data.role);
                localStorage.setItem('Email', response.data.email);
                localStorage.setItem('Staffer', response.data.staffName);
                toast.success('Login successful!', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                setTimeout(() => {
                    Navigate('/dashboard');
                }, 1000)
                
                console.log('Response:', response.data);
            } else {
                toast.error('An unexpected response was received.', {
                    position: 'top-center',
                    autoClose: 2000,
                });
            }
        } catch (error) {
            toast.dismiss(waitingToast);

            if (error.response) {
                const errorMessage = 'Login failed. Please try again.';
                toast.error(errorMessage, {
                    position: 'top-center',
                    autoClose: 2000,
                });
                console.error('Error Response:', error.response.data);
            } else {
                toast.error('Login failed. Please try again.', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="home">
            <NavBar />
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="role">Select Role</label>
                    <select name="role" id="role" value={formData.role} onChange={handleChange}>
                        <option value="adm">Admin</option>
                        <option value="stf">Staff</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="emailOrReg">Email</label>
                    <input
                        type="email"
                        id="emailOrReg"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <i className="fa-solid fa-envelope"></i>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <i className="fa-solid fa-lock"></i>
                </div>

                <p>
                    <a href="#" className="forget">Forgot Password?</a>
                </p>

                <input id="btn" type="submit" value="Login" />
            </form>
            <ToastContainer />
        </div>
        </div>
    );
}

export default LoginForm;
