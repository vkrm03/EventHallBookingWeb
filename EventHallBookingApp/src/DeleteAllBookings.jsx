import React, { useState, useEffect } from "react";
import "../public/MyBookings.css";
import api_uri from "../uri";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import AdminBar from "./AdminBar";

function DeleteAllBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await axios.get(api_uri + "/all-bookings");
                setBookings(response.data); 
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
            <AdminBar />
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
                                <th>Staff Name</th>
                                <th>Event Name</th>
                                <th>Event Date</th>
                                <th>Timings</th>
                                <th>Venue</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
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
                console.log("Booking deleted successfully");
                toast.success('Booking deleted successfully!', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
              } else {
                toast.dismiss(waitingToast);
                console.error("Error deleting booking:", response.data);
                toast.error('An unexpected response was received.', {
                    position: 'top-center',
                    autoClose: 2000,
                });
              }
            } catch (error) {
                toast.dismiss(waitingToast);
              console.error("Error deleting booking:", error);
              toast.error('An unexpected response was received.', {
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
