import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './request.css';
import Navbar from '../navbar/navbar';

const ReceivedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3002/user/request/received', {
        withCredentials: true,
      });

      setRequests(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching requests');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="received-requests">
        <div className="requests-container">
          <h1>Received Requests</h1>

          {loading && <p className="loader">Loading...</p>}
          {error && <p className="error">{error}</p>}

          <div className="requests-list">
            {requests.length > 0 ? (
              requests.map((request) => (
                <div key={request._id} className="request-card">
                  <h3>
                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                  </h3>
                  <p>Status: {request.status}</p>
                </div>
              ))
            ) : (
              <p className="no-requests">No requests received.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceivedRequests;
