import React, { useEffect, useState } from "react";
import axios from "axios";
import "./connections.css";
import Navbar from "../navbar/navbar";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:3002/user/connections", {
        withCredentials: true,
      });

      setConnections(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching connections");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="connections">
        <h1>Your Connections</h1>

        {loading && <p className="loader">Loading...</p>}
        {error && <p className="error">{error}</p>}

        <div className="connections-list">
          {connections.length > 0 ? (
            connections.map((user) => (
              <div key={user._id} className="connection-card">
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
                <p>Email: {user.email}</p>
              </div>
            ))
          ) : (
            <p className="no-connections">No connections found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Connections;
