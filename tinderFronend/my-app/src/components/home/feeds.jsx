import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SwipeableCard from './SwipeableCard';
import './Home.css';

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
      const response = await axios.get('http://localhost:3002/feed', {
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
        `http://localhost:3002/request/send/${status}/${userId}`,
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
    <div className="feed-container">
      <h1 className="feed-title">Swipe Feed</h1>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="card-container">
        {/* Display the first user card only */}
        {users.length > 0 ? (
          <SwipeableCard user={users[0]} onSwipe={handleSwipe} />
        ) : (
          !loading && <p className="empty-text">No more users to display.</p>
        )}
      </div>

      <div className="button-container">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className={`nav-button ${page <= 1 ? 'disabled' : ''}`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="nav-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Feed;
