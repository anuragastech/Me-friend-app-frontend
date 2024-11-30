import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout", {}, { withCredentials: true }); // Logout API
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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

        {/* Logout Button */}
        <div className="auth-button">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
