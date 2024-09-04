import React, { useState, useEffect } from "react";
import "../public/Dashboard.css";
import api_uri from "../uri";
import AdminDashboard from "./AdminDashboard";
import StaffDashboard from "./StaffDashboard";
import axios from "axios";

function Dashboard() {
    const [bookings, setBookings] = useState([]);
    const [noOfBookings, setNoOfBookings] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isAdmin = localStorage.getItem('Role') === 'adm';
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
        <div className="d">
            {isAdmin ? <AdminDashboard /> : <StaffDashboard />}
        </div>
    );
}

export default Dashboard;
