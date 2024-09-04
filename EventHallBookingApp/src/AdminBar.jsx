import React from "react";
import { Link } from "react-router-dom";
import "../public/Sidebar.css";

function AdminBar() {
    const handleLogout = () => {
        localStorage.clear()
    }
    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="logo"></div>
                <ul className="menu">
                    <li className="sidebar-li">
                        <Link to="/dashboard" className="a">
                            <i className="fas fa-home"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="sidebar-li">
                        <Link to="/view-bookings" className="a">
                            <i className="fas fa-chart-bar"></i>
                            <span>View Bookings</span>
                        </Link>
                    </li>
                    <li className="sidebar-li">
                        <Link to="/book-hall" className="a">
                            <i className="fas fa-chart-bar"></i>
                            <span>Book Hall</span>
                        </Link>
                    </li>
                    <li className="sidebar-li">
                        <Link to="/my-bookings" className="a">
                            <i className="fas fa-book"></i>
                            <span>My Bookings</span>
                        </Link>
                    </li>
                    <li className="sidebar-li">
                        <Link to="/delete-bookings" className="a">
                        <i className="fa-solid fa-trash"></i>
                            <span>Delete Bookings</span>
                        </Link>
                    </li>
                    <li className="sidebar-li">
                        <Link to="/" onClick={handleLogout} className="a">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AdminBar;
