import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "./homeFooter";

const Home = () => {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <Navbar />
      {/* First Section */}
      <div className="w-full min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex flex-col justify-center items-start pl-10 pr-10 py-24">
        {/* Heading Container */}
        <div className="mb-8 text-center">
          <h1 className="text-white text-5xl font-extrabold leading-snug mb-4">
            Talk to strangers, <br /> Make friends!
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-6">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105 hover:from-blue-600 hover:to-blue-700 font-semibold text-lg">
            Text Chat
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105 hover:from-blue-600 hover:to-blue-700 font-semibold text-lg">
            Video Chat
          </button>
        </div>

        {/* Animations Container */}
        <div className="flex justify-end items-start w-full mt-16">
          <img
            src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1733082374/rb_1476_flmdfh.png"
            alt="Animation"
            className="w-1/4 h-auto object-contain"
          />
        </div>
      </div>

      {/* Second Section */}
      <div className="w-full h-80 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 flex flex-col justify-center items-center px-10 py-16 space-y-6">
        <button className="bg-white text-gray-900 rounded-xl px-10 py-4 text-lg font-semibold shadow-xl transition transform hover:scale-105 hover:bg-gray-100">
          Find friends
        </button>
        <h1 className="text-white text-4xl font-semibold">
          Discover like-minded individuals
        </h1>
        <h4 className="text-gray-300 text-xl">
          Chat anonymously and connect with new friends.
        </h4>
        <p className="text-gray-400 text-lg text-center">
          Discover strangers from around the world, enjoy seamless text and video chats without interruptions, and create genuine, lasting connections.
        </p>
      </div>

      {/* Animations Section */}
      <div className="w-full h-96 bg-gradient-to-r from-red-700 to-red-800 px-10 py-16 flex items-center justify-between">
        <div className="flex justify-start items-start">
          <img
            src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1733082357/rb_2148519053_wmzwd5.png"
            alt="Animation"
            className="w-72 h-72 object-contain rounded-xl shadow-xl"
          />
        </div>

        <div className="flex flex-col justify-start w-1/2 text-white">
          <h1 className="text-4xl font-semibold">Form New Connections</h1>
          <h5 className="text-xl mb-4">Chat with People Who Share Your Interests</h5>
          <p className="text-lg">
            Engage in meaningful conversations with individuals who share your passions. Whether it's hobbies, ideas, or simply fun moments, connect effortlessly and build genuine friendships—all within one app! Discover the joy of meeting new people who truly get you.
          </p>
        </div>
      </div>

      {/* ------------------------ */}
      <div className="w-full h-96 bg-gradient-to-r from-green-700 to-green-800 px-10 py-16 flex items-center justify-between">
        <div className="flex flex-col justify-start w-1/2 text-white">
          <h1 className="text-4xl font-semibold">Transform Your Conversations</h1>
          <h5 className="text-xl mb-4">From Strangers to Lifelong Friends</h5>
          <p className="text-lg">
            Meet exciting new people, foster authentic connections, explore different cultures, or simply enjoy casual chats. Our platform is crafted to provide you with the ultimate online chatting experience, making every conversation meaningful.
          </p>
        </div>
        <div className="flex justify-start items-start">
          <img
            src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1733082392/rb_82250_1_cpc38z.png"
            alt="Animation"
            className="w-72 h-72 object-contain rounded-xl shadow-xl"
          />
        </div>
      </div>

      {/* ------------------------ */}
      <div className="w-full h-96 bg-gradient-to-r from-red-700 to-red-800 px-10 py-16 flex items-center justify-between">
        <div className="flex justify-start items-start">
          <img
            src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1730976627/ai-generated-3d-world-global-network-digital-technology-png_b0geco.webp"
            alt="Animation"
            className="w-72 h-72 object-contain rounded-xl shadow-xl"
          />
        </div>

        <div className="flex flex-col justify-start w-1/2 text-white">
          <h1 className="text-4xl font-semibold">World Wide Connection</h1>
          <h5 className="text-xl mb-4">From Conversations to Global Connections</h5>
          <p className="text-lg">
            Connect with people from all corners of the world, share experiences, and build relationships that go beyond borders. Our platform allows you to engage in meaningful chats and create a global network of friends, wherever you are.
          </p>
        </div>

        <div className="flex justify-start items-start">
          <img
            src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1733082319/pexels-photo-697244_mvl4y8.jpg"
            alt="Animation"
            className="w-72 h-72 object-contain rounded-xl shadow-xl"
          />
        </div>
      </div>

      {/* ------------------------ */}
      <div className="w-full h-auto bg-gradient-to-r from-green-800 to-green-700 px-8 py-20">
        <h2 className="text-4xl text-white font-semibold text-center mb-8">Don't Take Our Word for It</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Review 1 */}
          <div className="flex flex-col justify-start text-white p-6 border-b border-gray-700 bg-green-700 rounded-lg shadow-xl">
            <p className="text-lg mb-4">"I was initially skeptical, but I quickly became a fan of this platform. It's spam-free, well-moderated, and helped me connect with people from around the world through both text and video chat. It's by far the best platform I've used for safe, random conversations."</p>
            <span className="text-sm font-semibold">Anonymous User</span>
          </div>

          {/* Review 2 */}
          <div className="flex flex-col justify-start text-white p-6 border-b border-gray-700 bg-green-700 rounded-lg shadow-xl">
            <p className="text-lg mb-4">"I’ve tried many other platforms for video chatting, but none compare. This one is by far the most enjoyable, offering a fun and safe environment for random chats. I’ve made new friends from different parts of the world, and I’m loving the experience!"</p>
            <span className="text-sm font-semibold">Anonymous User</span>
          </div>

          {/* Review 3 */}
          <div className="flex flex-col justify-start text-white p-6 border-b border-gray-700 bg-green-700 rounded-lg shadow-xl">
            <p className="text-lg mb-4">"Connecting with new people is so easy and fun on this platform! It’s user-friendly and quick, making it ideal for spontaneous conversations. I’ve had engaging chats with people from around the world and made real friends in a safe space."</p>
            <span className="text-sm font-semibold">Anonymous User</span>
          </div>

          {/* Review 4 */}
          <div className="flex flex-col justify-start text-white p-6 border-b border-gray-700 bg-green-700 rounded-lg shadow-xl">
            <p className="text-lg mb-4">"I was feeling lonely and wanted to connect with new people. This platform helped me easily find others to chat with, and I’ve built real friendships with people from all over. A wonderful and safe way to meet strangers!"</p>
            <span className="text-sm font-semibold">Anonymous User</span>
          </div>
        </div>
      </div>

      {/* ------------------------ */}
      <div className="w-full h-auto bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-600 px-8 py-16 mb-20">
        <h2 className="text-4xl text-white font-bold text-center mb-4">Stay in the Loop</h2>
        <p className="text-xl text-white text-center mb-8">
          Join our Instagram to get exclusive updates, sneak peeks, and be the first to know about our latest features and events!
        </p>

        <div className="flex justify-center space-x-8">
          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105 hover:from-cyan-600 hover:to-teal-600"
          >
            Join Instagram
          </a>

          {/* Contact Us Button */}
          <a
            href="mailto:contact@yourapp.com"
            className="bg-gradient-to-r from-gray-600 to-gray-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105 hover:from-gray-700 hover:to-gray-600"
          >
            Contact Us
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

