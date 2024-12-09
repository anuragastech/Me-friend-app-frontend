import React from "react";
import { useSwipeable } from "react-swipeable";

const SwipeableCard = ({ user, onSwipe }) => {
  // Swipe event handlers
  const handlers = useSwipeable({
    onSwipedRight: () => {
      console.log("Swiped Right");
      onSwipe("Right", user._id); // Call the onSwipe function passed from the parent
    },
    onSwipedLeft: () => {
      console.log("Swiped Left");
      onSwipe("Left", user._id); // Call the onSwipe function passed from the parent
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const imageUrl = user.image?.url || "https://via.placeholder.com/300";
  console.log("Image URL:", imageUrl); // Log image URL for debugging

  return (
    <div
      {...handlers}
      className="bg-gradient-to-br from-white via-gray-50 to-gray-200 p-6 rounded-3xl shadow-2xl transition-transform duration-300 max-w-sm mx-auto border border-gray-300 hover:shadow-md"
    >
      {/* User Image */}
      <div className="relative w-full h-64 mb-6 overflow-hidden rounded-2xl shadow-md border border-gray-200">
        <img
          src={imageUrl}
          alt={`${user.firstName}'s avatar`}
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70 rounded-2xl"></div>
      </div>

      {/* User Info */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-gray-800">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-lg text-gray-600">Age: {user.age}</p>
      </div>

      {/* Buttons for additional actions */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => onSwipe("Right", user._id)}
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md hover:from-green-400 hover:to-green-500 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={() => onSwipe("Left", user._id)}
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md hover:from-red-400 hover:to-red-500 transition-colors"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default SwipeableCard;
