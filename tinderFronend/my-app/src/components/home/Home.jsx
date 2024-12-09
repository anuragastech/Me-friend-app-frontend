import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "./homeFooter";
import Modal from "./Modal";

const Home = () => {
  const navigate = useNavigate(); 

  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleTextChatClick = () => {
    navigate("/login"); 
  };

  const handleVideoChatClick = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="w-full h-full overflow-x-hidden font-sans mb-8">
      <Navbar />
      {/* First Section */}
      <div className="w-full min-h-screen bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 flex flex-col justify-center items-start px-12 py-24">
        <div className="mb-12 max-w-3xl">
          <h1 className="text-white text-6xl font-extrabold leading-snug mb-6">
            Connect Beyond Boundaries
          </h1>
          <p className="text-gray-300 text-xl leading-relaxed">
            Step into a world where every conversation counts. Discover new friends, share unique experiences, and build connections that transcend borders. Join the global community today and make every moment meaningful!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex space-x-8">
          <button
            onClick={handleTextChatClick}
            className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-10 py-4 rounded-lg shadow-lg transition-transform hover:scale-105 hover:from-teal-600 hover:to-cyan-700 font-semibold text-xl"
          >
            Text Chat
          </button>
          <button
            onClick={handleVideoChatClick}
            className="bg-gradient-to-r from-pink-500 to-red-600 text-white px-10 py-4 rounded-lg shadow-lg transition-transform hover:scale-105 hover:from-pink-600 hover:to-red-700 font-semibold text-xl"
          >
            Video Chat
          </button>
        </div>

        {/* Decorative Animation */}
        <div className="w-full mt-16">
          <img
            src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1733082374/rb_1476_flmdfh.png"
            alt="Animation"
            className="w-2/5 mx-auto object-contain"
          />
        </div>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />

      {/* Second Section */}
      <div className="w-full py-24 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 flex flex-col justify-center items-center px-10 space-y-8">
        <button className="bg-gradient-to-r from-yellow-500 to-orange-600 text-gray-900 rounded-xl px-12 py-4 text-xl font-semibold shadow-xl transition-transform hover:scale-105 hover:from-yellow-600 hover:to-orange-700">
          Find Friends
        </button>
        <h1 className="text-white text-5xl font-bold text-center">
          Discover Like-Minded Individuals
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl">
          Chat anonymously, connect with people from around the globe, and make meaningful friendships effortlessly. Explore a safe and engaging platform where every conversation matters.
        </p>
      </div>

      {/* Highlighted Features Section */}
      <div className="w-full py-24 bg-gradient-to-r from-green-900 via-teal-800 to-green-900 px-10 flex items-center justify-between">
        <div className="w-1/2 text-white space-y-6">
          <h1 className="text-5xl font-extrabold">Form New Connections</h1>
          <p className="text-lg leading-relaxed">
            Engage in meaningful conversations with individuals who share your passions. Discover the joy of building real friendships through an intuitive and seamless platform.
          </p>
        </div>
        <img
          src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1733082357/rb_2148519053_wmzwd5.png"
          alt="Animation"
          className="w-1/3 object-contain rounded-xl shadow-lg"
        />
      </div>

      {/* Third Section */}
      <div className="w-full py-24 bg-gradient-to-r from-indigo-900 to-blue-800 px-10 flex items-center justify-between">
        <img
          src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1733082392/rb_82250_1_cpc38z.png"
          alt="Animation"
          className="w-1/3 object-contain rounded-xl shadow-lg"
        />
        <div className="w-1/2 text-white space-y-6">
          <h1 className="text-5xl font-extrabold">Transform Your Conversations</h1>
          <p className="text-lg leading-relaxed">
            Meet exciting new people, foster authentic connections, and explore unique cultures. Transform casual conversations into unforgettable experiences with ease.
          </p>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="w-full py-24 bg-gradient-to-r from-indigo-700 via-purple-800 to-indigo-700 px-10">
        <h2 className="text-4xl text-white font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-purple-800 p-6 rounded-xl shadow-xl space-y-4"
            >
              <p className="text-gray-200 text-lg">
                "This platform redefined the way I connect with people online. I’ve met so many interesting individuals, and the experience has been incredible!"
              </p>
              <span className="text-gray-400 text-sm">- Anonymous User</span>
            </div>
          ))}
        </div>
      </div>

      <Footer  />
    </div>
  );
};

export default Home;
