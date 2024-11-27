import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* App Logo */}
        <div className="logo">
          {/* <h1>💬 PremiumChat</h1> */}
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <NavLink
              to="/Home"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/requests"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Requests 
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/connections"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Connections
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>

        {/* Premium User Section */}
        <div className="premium-user">
          <span>🌟 Premium User</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
