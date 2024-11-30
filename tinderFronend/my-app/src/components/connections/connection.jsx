import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import Navbar from "../navbar/navbar";
import "./connections.css";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    setLoading(true); // Show loader
    setError(null); // Clear previous errors

    try {
      const response = await axios.get("http://localhost:3002/user/connections", {
        withCredentials: true,
      });

      // Update connections state
      setConnections(response.data.data || []);
    } catch (err) {
      // Handle errors gracefully
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleNavigateToChat = (user) => {
    // Ensure user has the required fields before navigating
    if (!user || !user._id) {
      setError("Invalid user data. Unable to open chat.");
      return;
    }

    navigate(`/chat/${user._id}`, { state: { user, connectionId: user._id } });
  };

  return (
    <>
      <Navbar />
      <div className="connections">
        <h1>Your Connections</h1>

        {/* Loading state */}
        {loading && <p className="loader">Loading connections...</p>}

        {/* Error state */}
        {error && <p className="error">{error}</p>}

        {/* Connections list */}
        {!loading && !error && (
          <div className="connections-list">
            {connections.length > 0 ? (
              connections.map((user) => (
                <div
                  key={user._id}
                  className="connection-card"
                  onClick={() => handleNavigateToChat(user)}
                >
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                  <p>Email: {user.email}</p>
                </div>
              ))
            ) : (
              <p className="no-connections">You don't have any connections yet.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Connections;
