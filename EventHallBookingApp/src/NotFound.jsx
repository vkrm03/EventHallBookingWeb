import React from "react";
import "../public/NotFound.css";
import NavBar from "./NavBar";

function NotFound() {
    return (
        <div className="home">
            <NavBar />
            <div className="not-found">
                <h1>404 Not Found</h1>
                <p>Oops! The page you are looking for does not exist.</p>
            </div>
        </div>
    );
}

export default NotFound;
