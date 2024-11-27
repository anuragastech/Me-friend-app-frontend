import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSwipeable } from 'react-swipeable';
import './Home.css';
import SwipeableCard from './SwipeableCard'; 
import Navbar from "../navbar/navbar"



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

  // Function to handle swipe logic (this gets passed to the child component)
  const handleSwipe = async (direction, userId) => {
    const status = direction === 'Right' ? 'interested' : 'ignored';

    try {
      const response = await axios.post(
        `http://localhost:3002/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log(response.data.message);

      // Update the users list to remove the swiped user
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      console.error('Error sending request:', err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Swipe Feed</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="card-container">
        {/* Pass handleSwipe function as prop to the child component */}
        {users.map((user) => (
          <SwipeableCard key={user._id} user={user} onSwipe={handleSwipe} />
        ))}
      </div>

      <div>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Feed;
