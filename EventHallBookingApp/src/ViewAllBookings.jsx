import React, { useState, useEffect } from "react";
import "../public/MyBookings.css";
import api_uri from "../uri";
import axios from "axios";
import AdminBar from "./AdminBar";

function ViewAllBookings() {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVenue, setSelectedVenue] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await axios.get(api_uri + "/all-bookings");
                setBookings(response.data);
                setFilteredBookings(response.data);
            } catch (error) {
                setError("Error fetching bookings");
            } finally {
                setLoading(false);
            }
        }

        fetchBookings();
    }, []);

    useEffect(() => {
        let filtered = bookings;

        if (selectedVenue) {
            filtered = filtered.filter(booking => booking.venue === selectedVenue);
        }

        if (selectedDate) {
            filtered = filtered.filter(booking => booking.eventDate === selectedDate);
        }

        setFilteredBookings(filtered);
    }, [selectedVenue, selectedDate, bookings]);


    const handleVenueChange = (event) => {
        setSelectedVenue(event.target.value);
    };


    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const uniqueDates = Array.from(new Set(bookings.map(booking => booking.eventDate)));

    return (
        <div className="dashboard">
            <AdminBar />
            <div className="main-content">
                <h1>View All Bookings</h1>

                <div style={{ width: "50%" }}>
                    <select name="venue" id="venue" value={selectedVenue} onChange={handleVenueChange}>
                        <option value="">All Venues</option> {/* Default option to show all bookings */}
                        <option value="Seminar Hall 1">Seminar Hall 1</option>
                        <option value="Seminar Hall 2">Seminar Hall 2</option>
                    </select>
                </div>

                <div style={{ width: "50%", marginTop: "10px" }}>
                    <select name="date" id="date" value={selectedDate} onChange={handleDateChange}>
                        <option value="">All Dates</option>
                        {uniqueDates.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                        ))}
                    </select>
                </div>

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
                            {filteredBookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking.bookedStaff}</td>
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

export default ViewAllBookings;
