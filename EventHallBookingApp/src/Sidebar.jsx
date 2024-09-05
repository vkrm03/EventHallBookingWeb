import React from "react";
import { Link } from "react-router-dom";
import "../public/Sidebar.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SideBar() {
    const Navigate = useNavigate();
    async function handleClick() {
        localStorage.clear()
        toast.success('Logout successful!', {
            position: 'top-center',
            autoClose: 2000,
        });
        setTimeout(() => {
            Navigate("/login")
        }, 3000)
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
                        <Link to={localStorage.getItem('Role') === "adm" ? "/view-bookings" : "/check-hall"} className="a">
                            <i className="fas fa-chart-bar"></i>
                            <span>{localStorage.getItem('Role') === "adm" ? "View Bookings" : "Check Availability"}</span>
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
                    {localStorage.getItem('Staffer') === "Dr.S.Urmela" || localStorage.getItem('Staffer') === "Shamili.P" ? (
                        <li className="sidebar-li">
                            <Link to="/hall-event" className="a">
                                <i className="fa-solid fa-calendar-days"></i>
                                <span>Hall Events</span>
                            </Link>
                        </li>
                    ) : null}
                    <li className="sidebar-li">
                        <Link to={localStorage.getItem('Role') === "adm" ? "/delete-bookings" : "/delete-my-bookings"} className="a">
                        <i className="fa-solid fa-trash"></i>
                            <span>{localStorage.getItem('Role') === "adm" ? "Delete Bookings" : "Delete My Bookings"}</span>
                        </Link>
                    </li>
                    <li className="sidebar-li">
                        <Link to="/" onClick={handleClick} className="a">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SideBar;
