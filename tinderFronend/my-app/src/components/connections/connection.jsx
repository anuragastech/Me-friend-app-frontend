import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import Navbar from "../navbar/navbar";

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-red-400 to-yellow-500 py-6 px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
          Your Connections
        </h1>

        {/* Loading state */}
        {loading && <p className="text-xl text-white">Loading connections...</p>}

        {/* Error state */}
        {error && <p className="text-xl text-red-300 mb-6">{error}</p>}

        {/* Connections list */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
            {connections.length > 0 ? (
              connections.map((user) => (
                <div
                  key={user._id}
                  className="bg-white text-gray-700 p-6 rounded-xl shadow-lg hover:transform hover:translate-y-2 transition-all cursor-pointer"
                  onClick={() => handleNavigateToChat(user)}
                >
                  <h3 className="text-2xl font-semibold mb-2">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">Email: {user.email}</p>
                </div>
              ))
            ) : (
              <p className="text-xl text-white">You don't have any connections yet.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Connections;
