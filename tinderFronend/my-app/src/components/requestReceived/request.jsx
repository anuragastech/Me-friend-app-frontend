import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/request/received`, {
        withCredentials: true,
      });

      setRequests(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching requests');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/user/request/update-status`,
        { requestId, newStatus },
        {
          withCredentials: true,
        }
      );

      // Update the request list locally after a successful update
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );

      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating status');
    }
  };

  return (
    <>
      <Navbar />
      <div className="received-requests bg-gradient-to-r from-blue-100 via-white to-purple-100 min-h-screen p-8">
        <div className="requests-container max-w-7xl mx-auto mt-16">
          {/* Page Heading */}
          <h1 className="text-center text-3xl font-bold text-gray-800 mt-10 mb-12 tracking-wider">
            Received Requests
          </h1>

          {/* Loading and Error Messages */}
          {loading && <p className="text-center text-2xl text-blue-600 font-medium">Loading...</p>}
          {error && <p className="text-center text-2xl text-red-500 font-medium">{error}</p>}

          {/* Requests List */}
          <div className="requests-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
            {requests.length > 0 ? (
              requests.map((request) => (
                <div
                  key={request._id}
                  className="request-card bg-white rounded-xl shadow-xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
                >
                  {/* User Details */}
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                  </h3>
                  <p className="text-lg text-gray-600">Status: {request.status}</p>

                  {/* Accept and Reject Buttons */}
                  <div className="mt-6 flex justify-center gap-6">
                    <button
                      onClick={() => handleUpdateStatus(request._id, 'accepted')}
                      className="bg-green-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-600 hover:shadow-2xl transition-all text-lg font-medium"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(request._id, 'rejected')}
                      className="bg-red-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-red-600 hover:shadow-2xl transition-all text-lg font-medium"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-2xl text-gray-500 font-medium mt-16">
                No requests received.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceivedRequests;
