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
        const response = await axios.get("/api/auth/verify", { withCredentials: true });
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
      await axios.post("/logout", {}, { withCredentials: true });
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
        <div className="flex  items-center space-x-3 text-xl font-bold uppercase text-cyan-400 cursor-pointer">
        <img
  // src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1733227227/conversation_xgsfzo.png"
  src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1733227481/chat_ow07xy.png"
  alt="FriendApp"
  className="w-12 h-12  shadow-md transform transition-all duration-300 hover:scale-110"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
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
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-cyan-400 px-4 py-2 rounded-md"
                      : "text-white hover:bg-cyan-400 px-4 py-2 rounded-md transition"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vlog"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-cyan-400 px-4 py-2 rounded-md"
                      : "text-white hover:bg-cyan-400 px-4 py-2 rounded-md transition"
                  }
                >
                  Vlog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-cyan-400 px-4 py-2 rounded-md"
                      : "text-white hover:bg-cyan-400 px-4 py-2 rounded-md transition"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/support"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-cyan-400 px-4 py-2 rounded-md"
                      : "text-white hover:bg-cyan-400 px-4 py-2 rounded-md transition"
                  }
                >
                  Support
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-cyan-400 px-4 py-2 rounded-md"
                      : "text-white hover:bg-cyan-400 px-4 py-2 rounded-md transition"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-cyan-400 px-4 py-2 rounded-md"
                      : "text-white hover:bg-cyan-400 px-4 py-2 rounded-md transition"
                  }
                >
                  Signup
                </NavLink>
              </li>
            </>
          )}

          {/* Show only when logged in */}
          {isLoggedIn && (
            <>
              <li>
                <NavLink
                  to="/feed"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-cyan-400 px-4 py-2 rounded-md"
                      : "text-white hover:bg-cyan-400 px-4 py-2 rounded-md transition"
                  }
                >
                  Feed
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/requests"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-cyan-400 px-4 py-2 rounded-md"
                      : "text-white hover:bg-cyan-400 px-4 py-2 rounded-md transition"
                  }
                >
                  Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/connections"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-cyan-400 px-4 py-2 rounded-md"
                      : "text-white hover:bg-cyan-400 px-4 py-2 rounded-md transition"
                  }
                >
                  Connections
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-cyan-400 px-4 py-2 rounded-md"
                      : "text-white hover:bg-cyan-400 px-4 py-2 rounded-md transition"
                  }
                >
                  Profile
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Logout Button */}
        {isLoggedIn && (
          <div className="ml-4">
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-cyan-400 to-teal-500 text-white px-6 py-2 rounded-full font-semibold transform transition duration-200 hover:scale-105"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
