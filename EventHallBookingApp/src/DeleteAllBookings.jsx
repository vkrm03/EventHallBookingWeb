import React, { useState, useEffect } from "react";
import "../public/MyBookings.css";
import api_uri from "../uri";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import AdminBar from "./AdminBar";

function DeleteAllBookings() {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVenue, setSelectedVenue] = useState("All Venues");
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
        const filtered = bookings.filter(booking => 
            (selectedVenue === "All Venues" || booking.venue === selectedVenue) && 
            (selectedDate === "" || booking.eventDate === formatDateForComparison(selectedDate))
        );
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
        return `${day}/${month}/${year}`; // Convert 'YYYY-MM-DD' to 'DD/MM/YYYY' for comparison
    };

    const uniqueDates = Array.from(new Set(bookings.map(booking => booking.eventDate)));
    const uniqueVenues = Array.from(new Set(bookings.map(booking => booking.venue)));

    return (
        <div className="dashboard">
            <AdminBar />
            <div className="main-content">
                <h1>Delete Bookings</h1>

                <div style={{ width: "50%" }}>
                    <select name="venue" id="venue" value={selectedVenue} onChange={handleVenueChange}>
                        <option value="All Venues">All Venues</option>
                        {uniqueVenues.map((venue, index) => (
                            <option key={index} value={venue}>{venue}</option>
                        ))}
                    </select>
                </div>

                <div style={{ width: "50%", marginTop: "10px" }} className="form-group">
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={selectedDate}
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
                                <th>Delete</th>
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
                                    <td>
                                        <button
                                            style={{
                                                backgroundColor: '#ff4d4d',
                                                color: 'white', 
                                                border: 'none',
                                                padding: '8px 12px', 
                                                fontSize: '14px',
                                                cursor: 'pointer', 
                                                borderRadius: '4px', 
                                                transition: 'background-color 0.3s',
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#cc0000'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff4d4d'}
                                            onClick={async () => {
                                                const waitingToast = toast.info('Deleting, please wait...', {
                                                    position: 'top-center',
                                                    autoClose: false,
                                                });
                                                try {
                                                    const response = await axios.post(`${api_uri}/delete-bookings`, {
                                                        id: booking._id
                                                    });
                                                    toast.dismiss(waitingToast);
                                                    if (response.status === 200) {
                                                        toast.success('Booking deleted successfully!', {
                                                            position: 'top-center',
                                                            autoClose: 2000,
                                                        });
                                                        setTimeout(() => {
                                                            window.location.reload();
                                                        }, 2000)
                                                    } else {
                                                        toast.error('An unexpected response was received.', {
                                                            position: 'top-center',
                                                            autoClose: 2000,
                                                        });
                                                    }
                                                } catch (error) {
                                                    toast.error('An unexpected error occurred.', {
                                                        position: 'top-center',
                                                        autoClose: 2000,
                                                    });
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default DeleteAllBookings;
