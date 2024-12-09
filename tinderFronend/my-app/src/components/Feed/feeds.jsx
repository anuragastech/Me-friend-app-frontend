import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SwipeableCard from './SwipeableCard';

const Feed = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/feed`, {
        params: { page, limit },
        withCredentials: true,
      });

      setUsers(response.data);
      // console.log(response.data, 'ramam');
    } catch (err) {
      setError('Unable to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (direction, userId) => {
    const status = direction === 'Right' ? 'interested' : 'ignored';

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log(response.data.message);

      // Remove the first user from the list after a swipe
      setUsers((prevUsers) => prevUsers.slice(1));
    } catch (err) {
      console.error('Error sending request:', err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 py-16 px-6">
      <h1 className="text-4xl mt-10 font-extrabold text-white text-center mb-5">
        Swipe Feed
      </h1>

      {loading && <p className="text-lg text-gray-100 text-center">Loading...</p>}
      {error && <p className="text-lg text-red-300 text-center">{error}</p>}

      <div className="flex items-center justify-center">
        {/* Display the first user card only */}
        {users.length > 0 ? (
          <SwipeableCard user={users[0]} onSwipe={handleSwipe} />
        ) : (
          !loading && (
            <p className="text-lg text-white text-center">
              No more users to display.
            </p>
          )
        )}
      </div>

      {/* Buttons Section */}
      <div className="flex justify-center space-x-6 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className={`px-8 py-3 text-lg font-semibold rounded-full transition-transform shadow-lg ${
            page <= 1
              ? 'bg-gray-400 text-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 hover:scale-105 hover:shadow-2xl'
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg rounded-full shadow-lg transition-transform hover:scale-105 hover:shadow-2xl"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Feed;
