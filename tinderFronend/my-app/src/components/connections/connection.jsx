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
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/connections`,
        { withCredentials: true }
      );

      const validConnections = response.data.data.filter(
        (user) => user && user.firstName && user.lastName
      );

      setConnections(validConnections);
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
      <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-blue-800 py-4 px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mt-20" >
            Your Connections
          </h1>
          <p className="text-lg text-gray-300">Tap a contact to start chatting</p>
        </div>

        <div className="flex flex-col items-center">
          {loading && (
            <p className="text-lg text-gray-200 font-medium animate-pulse">
              Loading connections...
            </p>
          )}

          {error && <p className="text-lg text-red-500 mb-4">{error}</p>}

          {!loading && !error && (
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden">
              {connections.length > 0 ? (
                connections.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-4 p-4 border-b border-gray-300 hover:bg-gray-50 transition-all cursor-pointer rounded-lg"
                    onClick={() => handleNavigateToChat(user)}
                  >
                    {/* Profile Picture */}
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      {user.image ? (
                        <img
                          src={user.image.url}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-green-500 to-teal-400 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">Last seen recently</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-lg text-gray-500 text-center py-4">
                  No connections found.
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
