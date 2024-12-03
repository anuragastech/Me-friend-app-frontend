import React from "react";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Premium Feature</h2>
        <p className="text-center text-gray-600 mb-6">
          Video chat is available only for premium customers. Please upgrade your plan to access this feature.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={() => window.location.href = "/pricing"} // Redirect to pricing page
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-500"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
