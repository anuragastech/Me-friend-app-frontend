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
    <div className="flex flex-col items-center justify-center h-screen bg-purple-100 py-6 px-4">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Swipe Feed</h1>

      {loading && <p className="text-lg text-gray-500">Loading...</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}

      <div className="w-full max-w-xl">
        {/* Display the first user card only */}
        {users.length > 0 ? (
          <SwipeableCard user={users[0]} onSwipe={handleSwipe} />
        ) : (
          !loading && <p className="text-lg text-gray-500">No more users to display.</p>
        )}
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className={`px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg transition-transform ${
            page <= 1 ? 'bg-gray-300 cursor-not-allowed' : ''
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg transition-transform hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Feed;
