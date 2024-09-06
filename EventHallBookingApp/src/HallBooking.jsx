import React, { useState } from "react";
import axios from "axios";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import api_uri from "../uri";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";  // To allow using React components inside SweetAlert2 modals
import "../public/HallBookings.css";

function HallBooking() {
    const [formData, setFormData] = useState({
        eventName: "",
        eventDate: "",
        startTime: "",
        endTime: "",
        venue: "Seminar Hall 1"
    });
    const Navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const formattedTomorrow = tomorrow.toISOString().split("T")[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };

    const formatTime = (timeString) => {
        let [hours, minutes] = timeString.split(":");
        const period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Show loading alert
        MySwal.fire({
            title: 'Booking...',
            text: 'Please wait while we process your request.',
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                MySwal.showLoading();
            }
        });

        const Staffer = localStorage.getItem('Staffer');
        
        const formattedData = {
            ...formData,
            bookedStaff: Staffer,
            eventDate: formatDate(formData.eventDate),
            startTime: formatTime(formData.startTime),
            endTime: formatTime(formData.endTime),
        };

        try {
            const response = await axios.post(api_uri + "/hall-booking", formattedData);

            if (response.status === 200) {
                // Success alert
                MySwal.fire({
                    title: 'Success!',
                    text: 'Event Hall booked successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    setFormData({
                        eventName: "",
                        eventDate: "",
                        startTime: "",
                        endTime: "",
                        venue: "Seminar Hall 1"
                    });
                    Navigate('/my-bookings');
                });
            } else {
                MySwal.fire({
                    title: 'Error',
                    text: 'Try selecting a different date.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            // Error alert with custom button
            MySwal.fire({
                title: 'Error!',
                text: 'Already booked for this time. Please choose another time slot.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error("There was an error submitting the booking!", error);
        }
    };

    return (
        <>
            <div className="dashboards">
                <SideBar />
                <div className="cont">
                    <form className="booking-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="eventName">Event Name:</label>
                            <input 
                                type="text" 
                                id="eventName" 
                                name="eventName" 
                                placeholder="Type the Event Name" 
                                value={formData.eventName} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventDate">Event Date:</label>
                            <input 
                                type="date" 
                                id="eventDate" 
                                name="eventDate" 
                                value={formData.eventDate} 
                                onChange={handleChange} 
                                min={formattedTomorrow} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="startTime">Start Time:</label>
                            <input 
                                type="time" 
                                id="startTime" 
                                name="startTime" 
                                value={formData.startTime} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="endTime">End Time:</label>
                            <input 
                                type="time" 
                                id="endTime" 
                                name="endTime" 
                                value={formData.endTime} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="venue">Venue:</label>
                            <select 
                                id="venue" 
                                name="venue" 
                                value={formData.venue} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="Seminar Hall 1">Seminar Hall 1</option>
                                <option value="Seminar Hall 2">Seminar Hall 2</option>
                            </select>
                        </div>

                        <div className="form-group submit-group">
                            <button type="submit" className="submit-btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default HallBooking;
