import React from 'react';
import { useSwipeable } from 'react-swipeable';
import './Home.css';

const SwipeableCard = ({ user, onSwipe }) => {
  // Swipe event handlers
  const handlers = useSwipeable({
    onSwipedRight: () => {
      console.log("Swiped Right");
      onSwipe('Right', user._id); // Call the onSwipe function passed from the parent
    },
    onSwipedLeft: () => {
      console.log("Swiped Left");
      onSwipe('Left', user._id);   // Call the onSwipe function passed from the parent
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="card">
      <img src={user.image} alt={user.firstName} className="user-image" />
      <h3>{user.firstName}</h3>
      <p>Age: {user.age}</p>
    </div>
  );
};

export default SwipeableCard;
