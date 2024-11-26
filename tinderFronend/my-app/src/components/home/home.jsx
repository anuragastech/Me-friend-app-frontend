import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Feed = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);  // For pagination
  const [limit] = useState(2);  // Number of users per page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [page]);  // Fetch users when the page changes

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make the GET request to the backend, sending cookies with the request
      const response = await axios.get('http://localhost:3002/feed', {
        params: { page, limit },  // Send page and limit as query parameters
        withCredentials: true,  // Ensure cookies are sent with cross-origin requests
      });

      setUsers(response.data);  // Update users state with the response data
    } catch (err) {
      setError('Unable to fetch data');  // Handle errors if the request fails
      console.error(err);
    } finally {
      setLoading(false);  // End the loading state after the request completes
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setPage(newPage);  // Update page number when pagination buttons are clicked
    }
  };

  return (
    <div>
      <h1>Feed</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user._id}>{user.firstName}</li> 
            ))}
          </ul>
        ) : (
          <p>No users found</p>
        )}
      </div>

      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <button onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Feed;
