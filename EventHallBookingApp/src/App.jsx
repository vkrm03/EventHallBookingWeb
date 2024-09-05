import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./login.jsx";
import About from "./About";
import Dashboard from "./Dashboard";
import HallBooking from "./HallBooking";
import MyBookings from "./MyBookings";
import DeleteBookings from "./DeleteBookings";
import ViewAllBookings from "./ViewAllBookings";
import HallEvents from "./HallEvents.jsx";
import CheckAvailability from "./CheckAvailability";
import DeleteAllBookings from "./DeleteAllBookings";
import NotFound from "./NotFound";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const isAdmin = localStorage.getItem('Role') === 'adm';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/view-bookings" element={isLoggedIn ?<ViewAllBookings /> : <Navigate to="/login"/> } />
        <Route path="/check-hall" element={isLoggedIn ?<CheckAvailability /> : <Navigate to="/login"/> } />
        <Route path="/book-hall" element={isLoggedIn ?<HallBooking /> : <Navigate to="/login"/> } />
        <Route path="/my-bookings" element={isLoggedIn ?<MyBookings /> : <Navigate to="/login"/> } />
        <Route path="/hall-event" element={isLoggedIn ?<HallEvents /> : <Navigate to="/login"/> } />
        <Route path="/delete-my-bookings" element={isLoggedIn ?<DeleteBookings /> : <Navigate to="/login"/> } />
        <Route path="/delete-bookings" element={isLoggedIn ?<DeleteAllBookings /> : <Navigate to="/login"/> } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
