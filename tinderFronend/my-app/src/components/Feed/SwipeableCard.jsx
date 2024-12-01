import React from 'react';
import { useSwipeable } from 'react-swipeable';

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
    <div
      {...handlers}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform"
    >
      <img
        src={user.image?.url || "https://via.placeholder.com/150"}
        alt={`${user.firstName}'s avatar`}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-700">{user.firstName}</h3>
      <p className="text-gray-500">Age: {user.age}</p>
    </div>
  );
};

export default SwipeableCard;
