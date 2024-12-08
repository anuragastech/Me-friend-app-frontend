import React from 'react';
import { useSwipeable } from 'react-swipeable';

const SwipeableCard = ({ user, onSwipe }) => {
  // Swipe event handlers
  const handlers = useSwipeable({
    onSwipedRight: () => {
      console.log('Swiped Right');
      onSwipe('Right', user._id); // Call the onSwipe function passed from the parent
    },
    onSwipedLeft: () => {
      console.log('Swiped Left');
      onSwipe('Left', user._id); // Call the onSwipe function passed from the parent
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const imageUrl = user.image?.url || 'https://via.placeholder.com/300';
  console.log('Image URL:', imageUrl); // Log image URL for debugging

  return (
    <div
      {...handlers}
      className="bg-white p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-transform transform scale-100 hover:scale-105 duration-300 max-w-sm mx-auto"
    >
      {/* User Image */}
      <div className="relative w-full h-64 mb-6 overflow-hidden rounded-2xl">
        <img
          src={imageUrl}
          alt={`${user.firstName}'s avatar`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70 rounded-2xl"></div>
      </div>

      {/* User Info */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{user.firstName}</h3>
        <p className="text-lg text-gray-500">Age: {user.age}</p>
      </div>
    </div>
  );
};

export default SwipeableCard;
