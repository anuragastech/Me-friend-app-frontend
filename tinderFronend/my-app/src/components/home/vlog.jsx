import React, { useState } from "react";
import Navbar from "../navbar/navbar";

const Vlog = () => {
  // Sample posts data
  const posts = [
    {
      id: 1,
      image: "https://via.placeholder.com/800x400?text=Friendship+Post",
      title: "The Beauty of Friendship",
      content: "Friendship is about creating beautiful memories together. Let's cherish every moment we share with our friends!",
      author: "John Doe",
      likes: 150,
      comments: 20,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/800x400?text=Love+Post",
      title: "Love Knows No Boundaries",
      content: "Love transcends all limits and connects souls. Spread love wherever you go, and it will find its way back to you.",
      author: "Jane Smith",
      likes: 200,
      comments: 35,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/800x400?text=Connection+Post",
      title: "Building Strong Connections",
      content: "True connections are built on trust, respect, and understanding. Let's strengthen our bonds and make lasting memories.",
      author: "Emily Lee",
      likes: 180,
      comments: 25,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white">
      <Navbar />

      <div className="max-w-screen-xl mx-auto px-4 pt-24 pb-16">
        {/* Vlog Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">Vlog: Connections That Matter</h2>
          <p className="text-lg text-cyan-300">
            Explore inspiring posts on friendship, love, and the power of meaningful connections. Share your own experiences and be part of the journey.
          </p>
        </div>

        {/* Posts Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post) => (
            <div key={post.id} className="bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-indigo-700">{post.title}</h3>
                <p className="text-lg text-gray-700">{post.content}</p>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="text-sm">{post.author}</span>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-1">{post.likes} Likes</span>
                    </span>
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                      <span className="ml-1">{post.comments} Comments</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-semibold text-white mb-6">Share Your Story</h3>
          <p className="text-lg text-cyan-300 mb-6">
            Have an inspiring story to share about friendship, love, or connections? Write your own post and join our vibrant community.
          </p>
          <a
            href="/create-post"
            className="bg-gradient-to-r from-cyan-400 to-teal-500 text-white px-8 py-3 rounded-full text-lg font-semibold transform transition duration-300 hover:scale-105"
          >
            Create Post
          </a>
        </div>
      </div>
    </div>
  );
};

export default Vlog;
