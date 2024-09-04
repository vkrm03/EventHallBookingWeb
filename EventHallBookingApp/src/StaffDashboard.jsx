import React, { useState, useEffect } from "react";
import "../public/Dashboard.css";
import api_uri from "../uri";
import axios from "axios";
import SideBar from "./Sidebar";

function StaffDashboard({ isAdmin }) {
    const [bookings, setBookings] = useState([]);
    const [user, setuser] = useState([]);
    const [noOfBookings, setNoOfBookings] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log("Logins " , isAdmin);
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('Role'));
    console.log(localStorage.getItem('Email'));
    const email = localStorage.getItem('Email');
    console.log(user);
    

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(api_uri + "/dashboard", {params: { user_email: email } });
                setuser(response.data);
                console.log(response.data);
            } catch (error) {
                setError("Error fetching user details");
                setLoading(false);
            }
        }
        fetchUser();
    }, []);


    useEffect(() => {
        async function fetchBookings() {
            try {
                const staff_name = localStorage.getItem('Staffer');
                const response = await axios.get(api_uri + "/stf-count-bookings" , {params :{staff_name : staff_name}});
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
            <SideBar />
            <div className="main-content">
                <h1>My Dashboard</h1>
                <div className="details">
                    <div className="detail-row">
                        <div className="label">Name:</div>
                        <div className="value">{user.length === 0 ? "loading..." : user[0].staff_name}</div>
                    </div>
                    <div className="detail-row">
                        <div className="label">Role:</div>
                        <div className="value">{user.length === 0 ? "loading..." : "Staff"}</div>
                    </div>
                    <div className="detail-row">
                        <div className="label">Email:</div>
                        <div className="value">{user.length === 0 ? "loading..." : user[0].email_id}</div>
                    </div>
                    <div className="detail-row">
                        <div className="label">Password:</div>
                        <div className="value">{user.length === 0 ? "loading..." : user[0].password}</div>
                    </div>
                    <div className="detail-row">
                        <div className="label">Gender:</div>
                        <div className="value">{user.length === 0 ? "loading..." : user[0].gender}</div>
                    </div>
                    <div className="detail-row">
                        <div className="label">Mobile No:</div>
                        <div className="value">{user.length === 0 ? "loading..." : user[0].mobile_no}</div>
                    </div>
                    <div className="detail-row">
                        <div className="label">Event's Booked:</div>
                        <div className="value">{noOfBookings}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaffDashboard;
