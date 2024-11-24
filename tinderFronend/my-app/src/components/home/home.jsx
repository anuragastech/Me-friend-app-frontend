import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';  // Import js-cookie
import './Home.css'; 

const Home = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // Number of profiles per page
  const [authToken, setAuthToken] = useState(Cookies.get("token")); // Get token from cookies

  // Fetch feed data from backend
  useEffect(() => {
    const fetchFeedData = async () => {
      if (!authToken) {
        console.log("User not authenticated");
        return; // Don't fetch if there's no token
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/feed?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Send token in Authorization header
            },
          }
        );
        setFeedData(response.data); // Store fetched feed data in state
        console.log(response.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feed data:', error);
        setLoading(false);
      }
    };

    fetchFeedData();
  }, [page, limit, authToken]);

  // Handle swipe actions
  const handleSwipeRight = (userId) => {
    console.log(`User with ID ${userId} swiped right (Liked)`);
    // Optionally, send a request to your backend to update like status
  };

  const handleSwipeLeft = (userId) => {
    console.log(`User with ID ${userId} swiped left (Disliked)`);
    // Optionally, send a request to your backend to update dislike status
  };

  return (
    <div className="home-page">
      <h1>Profile Feed</h1>

      {loading ? (
        <p>Loading feed...</p>
      ) : (
        <div className="profile-cards-container">
          {feedData.map((user) => (
            <div className="profile-card" key={user._id}>
              <img
                src={user.imageUrl} // Assuming 'imageUrl' is the user's image
                alt={`${user.name}'s profile`}
                className="profile-image"
              />
              <h2>{user.name}</h2>
              <p>{user.age} years old</p>

              {/* Display leads date if available */}
              {user.leadsDate && (
                <p className="leads-date">Leads Date: {new Date(user.leadsDate).toLocaleDateString()}</p>
              )}

              <div className="swipe-actions">
                <button
                  onClick={() => handleSwipeLeft(user._id)}
                  className="swipe-button left"
                >
                  Dislike
                </button>
                <button
                  onClick={() => handleSwipeRight(user._id)}
                  className="swipe-button right"
                >
                  Like
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
