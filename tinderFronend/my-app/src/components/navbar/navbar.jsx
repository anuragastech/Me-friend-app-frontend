import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check login state by calling backend API
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/verify`, { withCredentials: true });
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, { withCredentials: true });
      setIsLoggedIn(false); // Update login state
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-700 to-indigo-800 text-white fixed top-0 left-0 z-10 shadow-lg">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center py-4 px-6">
        {/* FriendApp Logo */}
        <div className="flex items-center space-x-3 text-xl font-bold uppercase text-cyan-400 cursor-pointer">
          <img
            src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1733227481/chat_ow07xy.png"
            alt="FriendApp"
            className="w-12 h-12 shadow-md transform transition-all duration-300 hover:scale-110"
          />
          <span>FriendApp</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`lg:flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-indigo-700 lg:bg-transparent ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          {/* Show only when not logged in */}
          {!isLoggedIn && (
            <>
              <li>
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/vlog" className="nav-link">
                  Vlog
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/support" className="nav-link">
                  Support
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className="nav-link">
                  Signup
                </NavLink>
              </li>
            </>
          )}

          {/* Show only when logged in */}
          {isLoggedIn && (
            <>
              <li>
                <NavLink to="/feed" className="nav-link">
                  Feed
                </NavLink>
              </li>
              <li>
                <NavLink to="/requests" className="nav-link">
                  Requests
                </NavLink>
              </li>
              <li>
                <NavLink to="/connections" className="nav-link">
                  Connections
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>
              </li>
              {/* Logout button added here */}
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-red-600 px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
