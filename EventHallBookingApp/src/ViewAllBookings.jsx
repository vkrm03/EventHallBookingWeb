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
            const formattedSelectedDate = formatDateForComparison(selectedDate); // Convert to 'DD/MM/YYYY'
            filtered = filtered.filter(booking => booking.eventDate === formattedSelectedDate);
        }

        setFilteredBookings(filtered);
    }, [selectedVenue, selectedDate, bookings]);

    const handleVenueChange = (event) => {
        setSelectedVenue(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value); // Keep it in 'YYYY-MM-DD' format
    };

    const formatDateForComparison = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`; // Convert 'YYYY-MM-DD' to 'DD/MM/YYYY'
    };

    return (
        <div className="dashboard">
            <AdminBar />
            <div className="main-content">
                <h1>View All Bookings</h1>

                <div style={{ width: "50%" }}>
                    <select name="venue" id="venue" value={selectedVenue} onChange={handleVenueChange}>
                        <option value="">All Venues</option>
                        <option value="Seminar Hall 1">Seminar Hall 1</option>
                        <option value="Seminar Hall 2">Seminar Hall 2</option>
                    </select>
                </div>

                <div style={{ width: "50%", marginTop: "10px" }} className="form-group">
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={selectedDate} // Ensure it's 'YYYY-MM-DD' format for input field
                        onChange={handleDateChange}
                    />
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
