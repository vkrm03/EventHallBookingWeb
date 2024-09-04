import React from 'react';
import { Link } from 'react-router-dom';
import "../public/NavBar.css";

const NavBar = () => {
  return (
    <header>
      <nav>
        <div className="nav-left">
          
          <Link to="/"><img src="/univ-logo.png" className="logo-img" alt="Logo" /></Link>
        </div>
        <div className="nav-right">
          <ul className='nav-ul'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
