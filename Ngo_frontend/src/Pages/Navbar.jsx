import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Sections */}
        <Link to="/" className="navbar-logo">
          NGO Name
        </Link>
        
        {/* Hamburger Menu */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        {/* Menu Links */}
        <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
          </li>
          <li className="navbar-item">
            <Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link>
          </li>
          <li className="navbar-item">
            <Link to="/events" onClick={() => setIsOpen(false)}>Events</Link>
          </li>
          <li className="navbar-item">
            <Link to="/donate" onClick={() => setIsOpen(false)}>Donate</Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
