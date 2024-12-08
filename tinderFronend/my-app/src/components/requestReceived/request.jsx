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
      <div className="received-requests bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen p-8">
        <div className="requests-container max-w-7xl mx-auto">
          <h1 className="text-center text-4xl font-semibold text-gray-800 mb-8">
            Received Requests
          </h1>

          {loading && <p className="text-center text-xl text-blue-500">Loading...</p>}
          {error && <p className="text-center text-xl text-red-500">{error}</p>}

          <div className="requests-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {requests.length > 0 ? (
              requests.map((request) => (
                <div
                  key={request._id}
                  className="request-card bg-white rounded-xl shadow-xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
                >
                  <h3 className="text-xl font-semibold text-gray-700">
                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                  </h3>
                  <p className="mt-2 text-gray-500">Status: {request.status}</p>

                  {/* Accept and Reject Buttons */}
                  <div className="mt-4 flex justify-center gap-4">
                    <button
                      onClick={() => handleUpdateStatus(request._id, 'accepted')}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(request._id, 'rejected')}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-500 mt-8">No requests received.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceivedRequests;
