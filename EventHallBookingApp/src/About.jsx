import React from "react";
import NavBar from "./NavBar";
import "../public/about.css";

function About() {
    return (
        <div className="home">
            <NavBar />
        <div className="about-section">
            <div className="about-content">
                <h1 className="about-title">Event Venue Booking Project</h1>
                <p className="about-text">
                    Our Event Venue Booking platform is designed to simplify the process of reserving spaces for various events, from conferences to social gatherings. With a focus on user experience, our platform offers a seamless way to find and book the perfect venue.
                </p>
                <p className="about-text">
                    This is the Event Venue Booking project for Dept of Information Technology Done by Students of Information Technology [Vikram A - IIyr A4, Vivek S - IIyr A4].
                </p>
                <p className="about-text">
                    Whether the faculty member, or an external organizer, our system provides real-time availability, detailed venue information, and an intuitive booking process to ensure your event planning is stress-free.
                </p>
                <p className="about-text">
                    Our goal is to provide an efficient, transparent, and enjoyable booking experience, ensuring that you find the perfect venue for your event effortlessly.
                </p>
            </div>
            
        </div>
        </div> 
    );
}

export default About;
