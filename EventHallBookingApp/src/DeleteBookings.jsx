import React, { useState, useEffect } from "react";
import "../public/MyBookings.css";
import { useNavigate } from "react-router-dom";
import api_uri from "../uri";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import SideBar from "./Sidebar";

function DeleteBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const Navigate = useNavigate();
    useEffect(() => {
        async function fetchBookings() {
            try {
              const staff_name = localStorage.getItem('Staffer');
                const response = await axios.get(api_uri + "/delete-bookings", {params :{staff_name : staff_name}});
                console.log(response.data.length);
                
                if (response.data.length === 0) {
                  setError("No Bookings")
                  setLoading(false);
                } else {
                  setBookings(response.data);
                  setLoading(false);
                }
            } catch (error) {
                setError("Error fetching bookings");
                setLoading(false);
            }
        }
        fetchBookings();
    }, [])

    return (
        <div className="dashboard">
            <SideBar />
            <div className="main-content">
                <h1>Delete Bookings</h1>
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
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
  {bookings.map((booking) => (
    <tr key={booking._id}>
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
            try {
              const response = await axios.post(`${api_uri}/delete-bookings`, {
                id: booking._id
              });
              setTimeout(() => {
                window.location.reload();
            }, 1000);
            const waitingToast = toast.info('Deleting, please wait...', {
                position: 'top-center',
                autoClose: false,
            });
            toast.dismiss(waitingToast);
              if (response.status === 200) {
                console.log("Booking deleted successfully");
                toast.success('Booking deleted successfully!', {
                    position: 'top-center',
                    autoClose: 2000,
                });
              } else {
                console.error("Error deleting booking:", response.data);
                toast.error('An unexpected response was received.', {
                    position: 'top-center',
                    autoClose: 2000,
                });
              }
            } catch (error) {
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


                </table>)}
            </div>
            <ToastContainer />
        </div>
    );
}

export default DeleteBookings;
