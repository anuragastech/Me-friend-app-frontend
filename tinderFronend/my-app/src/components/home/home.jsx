import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [feedData, setFeedData] = useState([]); // Store feed data
  const [loading, setLoading] = useState(true); // Loading state
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(5); // Number of profiles per page

  // Fetch feed data from backend
  useEffect(() => {
    const fetchFeedData = async () => {
      setLoading(true); // Start loading

      try {
        const response = await axios.get(
          `http://localhost:3002/feed?page=${page}&limit=${limit}`
        );
        setFeedData(response.data); // Store fetched feed data in state
        console.log("Fetched feed data:", response.data);
      } catch (error) {
        console.error("Error fetching feed data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchFeedData();
  }, [page, limit]);

  // Handle swipe actions
  const handleSwipeRight = (userId) => {
    console.log(`User with ID ${userId} swiped right (Liked)`);
    // Optionally, add logic for liking a profile
  };

  const handleSwipeLeft = (userId) => {
    console.log(`User with ID ${userId} swiped left (Disliked)`);
    // Optionally, add logic for disliking a profile
  };

  return (
    <div className="home-page">
      <h1>Profile Feed</h1>

      {loading ? (
        <p>Loading feed...</p>
      ) : feedData.length > 0 ? (
        <div className="profile-cards-container">
          {feedData.map((user) => (
            <div className="profile-card" key={user._id}>
              <img
                src={user.imageUrl || "default-avatar.png"} // Fallback image if imageUrl is not provided
                alt={`${user.name}'s profile`}
                className="profile-image"
              />
              <h2>{user.name}</h2>
              <p>{user.age} years old</p>

              {/* Display leads date if available */}
              {user.leadsDate && (
                <p className="leads-date">
                  Leads Date: {new Date(user.leadsDate).toLocaleDateString()}
                </p>
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
      ) : (
        <p>No profiles available to show.</p>
      )}

      {/* Pagination controls */}
      {feedData.length > 0 && (
        <div className="pagination-controls">
          <button
            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage((prevPage) => prevPage + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
