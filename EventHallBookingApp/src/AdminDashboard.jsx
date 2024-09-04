import React, { useState, useEffect } from "react";
import "../public/Dashboard.css";
import api_uri from "../uri";
import AdminBar from "./AdminBar";
import axios from "axios";
import SideBar from "./Sidebar";

function AdminDashboard() {
    const [bookings, setBookings] = useState([]);
    const [noOfBookings, setNoOfBookings] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('Role'));
    console.log(localStorage.getItem('Email'));


    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await axios.get(api_uri + "/count-bookings");
                setBookings(response.data);
                setNoOfBookings(response.data.length);
                setLoading(false);
            } catch (error) {
                setError("Error fetching bookings");
                setLoading(false);
            }
        }
        fetchBookings();
    }, []); 

    return (
        <div className="dashboard">
            <AdminBar/>
            <div className="main-content">
                <h1>Admin Dashboard</h1>
                <div className="details">
                    <div className="detail-row">
                        <div className="label">Name:</div>
                        <div className="value">DR.Revathi</div>
                    </div>
                    <div className="detail-row">
                        <div className="label">Role:</div>
                        <div className="value">Admin</div>
                    </div>
                    <div className="detail-row">
                        <div className="label">Email:</div>
                        <div className="value">ithod@sathyabama.ac.in</div>
                    </div>
                    <div className="detail-row">
                        <div className="label">Password:</div>
                        <div className="value">Password</div>
                    </div>
                    <div className="detail-row">
                        <div className="label">Gender:</div>
                        <div className="value">Female</div>
                    </div>
                    <div className="detail-row">
                        <div className="label">Mobile No:</div>
                        <div className="value">+91 9840185872</div>
                    </div>
                    <div className="detail-row">
                        <div className="label">Total Event's Booked:</div>
                        <div className="value">{noOfBookings}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
