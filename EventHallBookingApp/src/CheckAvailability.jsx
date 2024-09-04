import React, { useState, useEffect, useCallback } from "react";
import "../public/MyBookings.css";
import api_uri from "../uri";   
import axios from "axios";
import SideBar from "./Sidebar";

function CheckAvailability() {
    const [bookings, setBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };

    const fetchBookings = useCallback(async (date) => {
        try {
            const formattedDate = formatDate(date); // Format the date before sending it
            const response = await axios.get(`${api_uri}/available-slots`, {
                params: { date: formattedDate }  // Send the formatted date as a query parameter
            });
            setBookings(response.data);
        } catch {
            // Handle errors silently (or log them if needed)
            setBookings([]); // Optionally clear bookings in case of an error
        }
    }, []);

    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedDate(date);
        fetchBookings(date);
    };

    useEffect(() => {
        if (selectedDate) {
            fetchBookings(selectedDate);
        }
    }, [selectedDate, fetchBookings]);

    return (
        <div className="dashboard">
            <SideBar />
            <div className="main-content">
                <h1>Check Available Bookings</h1>
                <input 
                    type="date" 
                    onChange={handleDateChange}
                    value={selectedDate}
                    style={{
                        width: '50%', /* Full width of the parent container */
                        padding: '5px', /* Padding for better spacing */
                        border: '1px solid #ccc', /* Light border color */
                        borderRadius: '4px', /* Rounded corners */
                        fontSize: '16px', /* Font size */
                        boxSizing: 'border-box', /* Include padding and border in the element's total width and height */
                        backgroundColor: '#f9f9f9', /* Light background color */
                        transition: 'border-color 0.3s ease', /* Smooth transition for border color change */
                        outline: 'none' /* Remove default outline */
                    }} 
                />

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
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking.eventName}</td>
                                    <td>{booking.eventDate}</td>
                                    <td>{`${booking.startTime} - ${booking.endTime}`}</td>
                                    <td>{booking.venue}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No Events</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CheckAvailability;
