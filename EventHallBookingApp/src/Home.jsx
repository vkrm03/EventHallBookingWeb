import React from "react";
import FooterBar from "./Footer";
import NavBar from "./NavBar";
import "../public/home.css";

function Home() {
    
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('Role'));
    console.log(localStorage.getItem('Email'));
    return (
        <div className="home">
            <NavBar />
            <div className="content">
                <div className="content-container">
                    <div className="content-text" id="band">
                        <h2 className="title">SATHYABAMA INSTITUTE OF SCIENCE AND TECHNOLOGY</h2>
                        <p className="opacity-down"><i> <i className="fa-solid fa-quote-left"></i> DEPARTMENT OF INFORMATION TECHNOLOGY <i className="fa-solid fa-quote-right"></i></i></p>
                    </div>
                    <div className="features-section">
                    <div className="feature">
                            <h2>Online Booking Portal</h2>
                            <p>The online portal offers a user-friendly interface to check venue availability, select the desired venue, and complete the booking process with just a few clicks.</p>
                        </div>
                        <div className="feature">
                            <h2>Real-Time Availability</h2>
                            <p>The system provides real-time updates on venue availability, ensuring that Staff can make informed decisions and avoid scheduling conflicts.</p>
                        </div>
                        </div>
                </div>
            </div>
            <FooterBar />
            </div>
    );
}

export default Home;
