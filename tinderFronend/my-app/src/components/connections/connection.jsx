import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar/navbar";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/connections`, {
        withCredentials: true,
      });

      setConnections(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToChat = (user) => {
    if (!user || !user._id) {
      setError("Invalid user data. Unable to open chat.");
      return;
    }

    navigate(`/chat/${user._id}`, { state: { user, connectionId: user._id } });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-teal-500 via-green-500 to-blue-500 py-12 px-6">
        {/* Top-aligned heading */}
        <div className="text-center mb-10 mt-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide drop-shadow-2xl">
            Your Connections
          </h1>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center justify-start">
          {/* Loading state */}
          {loading && <p className="text-2xl text-white font-medium animate-pulse">Loading connections...</p>}

          {/* Error state */}
          {error && <p className="text-2xl text-red-200 mb-6">{error}</p>}

          {/* Connections list */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
              {connections.length > 0 ? (
                connections.map((user) => (
                  <div
                    key={user._id}
                    className="connection-card bg-white text-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:transform hover:translate-y-[-4px] transition-all cursor-pointer"
                    onClick={() => handleNavigateToChat(user)}
                  >
                    {/* User Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{user.firstName} {user.lastName}</h3>
                        <p className="text-sm text-gray-600">Email: {user.email}</p>
                      </div>
                    </div>

                    {/* Button to start a conversation */}
                    <button
                      onClick={() => handleNavigateToChat(user)}
                      className="mt-4 w-full py-2 px-4 text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 transition-all duration-200"
                    >
                      Start Chat
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-2xl text-white font-medium text-center mt-6">
                  You don't have any connections yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Connections;
