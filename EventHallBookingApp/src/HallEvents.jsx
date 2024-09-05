import React, { useState, useEffect } from "react";
import "../public/MyBookings.css";
import api_uri from "../uri";
import axios from "axios";
import SideBar from "./Sidebar";

function HallEvents() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await axios.get(api_uri + "/all-bookings");
                if (localStorage.getItem('Staffer') === "Shamili.P") {
                    response.data = response.data.filter(booking => booking.venue === "Seminar Hall 1");
                } else {
                    response.data = response.data.filter(booking => booking.venue === "Seminar Hall 2");
                }
                setBookings(response.data);
            } catch (error) {
                setError("Error fetching bookings");
            } finally {
                setLoading(false);
            }
        }

        fetchBookings();
    }, []);

    return (
        <div className="dashboard">
            <SideBar />
            <div className="main-content">
                <h1>{localStorage.getItem('Staffer') === "Shamili.P" ? "Seminar Hall 1" : "Seminar Hall 2"} Bookings</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <table className="marks-table">
                        <thead>
                            <tr>
                                <th>Staff Name</th>
                                <th>Event Name</th>
                                <th>Event Date</th>
                                <th>Timings</th>
                                <th>Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <tr>{booking.bookedStaff}</tr>
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

export default HallEvents;
