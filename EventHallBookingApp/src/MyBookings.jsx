import React, { useState, useEffect } from "react";
import "../public/MyBookings.css";
import api_uri from "../uri";
import axios from "axios";
import SideBar from "./Sidebar";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const staff_name = localStorage.getItem('Staffer');
                console.log(staff_name);
                const response = await axios.get(api_uri + "/my-bookings", {params: {staff_name: staff_name}});
                if (response.data.length > 0) {
                    setBookings(response.data);
                } else {
                    setError("No bookings");
                }
            } catch (error) {
                setError("Error fetching bookings");
            } finally {
                setLoading(false);
            }
        }

        fetchBookings();
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div className="dashboard">
            <SideBar />
            <div className="main-content">
                <h1>My Bookings</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <table className="marks-table">
                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Event Date</th>
                                <th>Timings</th>
                                <th>Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking.eventName}</td>
                                    <td>{booking.eventDate}</td>
                                    <td>{`${booking.startTime} - ${booking.endTime}`}</td>
                                    <td>{booking.venue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default MyBookings;
