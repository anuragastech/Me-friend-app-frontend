import React from "react";
import Navbar from "../navbar/navbar";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white py-16 pt-24">
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">About FriendApp</h2>
          <p className="text-lg text-cyan-300">
            A premium chat app designed to make meaningful connections. FriendApp helps you connect with people who share your passions and interests.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Section: Image */}
          <div className="relative">
            <img
              src="https://via.placeholder.com/600x400"
              alt="About FriendApp"
              className="w-full rounded-lg shadow-xl"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black opacity-30 rounded-lg"></div>
          </div>

          {/* Right Section: Description */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Our Mission</h3>
            <p className="text-lg text-cyan-300">
              At FriendApp, our mission is to bring people together in a safe and friendly environment. Whether you
              are looking to expand your social network, share your thoughts, or make new friends, we provide a platform
              that makes it all possible.
            </p>

            <h3 className="text-2xl font-semibold">Why Choose FriendApp?</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-cyan-400"
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
                <p className="text-lg text-cyan-300">Connect with like-minded people quickly and easily.</p>
              </li>
              <li className="flex items-start space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-cyan-400"
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
                <p className="text-lg text-cyan-300">Safe and private messaging with end-to-end encryption.</p>
              </li>
              <li className="flex items-start space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-cyan-400"
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
                <p className="text-lg text-cyan-300">User-friendly interface with sleek design.</p>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold">Our Vision</h3>
            <p className="text-lg text-cyan-300">
              Our vision is to create an inclusive community where everyone can connect, share experiences, and grow
              together. With FriendApp, you’re not just chatting, you’re creating lasting relationships.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-white mb-4">Join Us Today</h2>
          <p className="text-lg text-cyan-300 mb-6">
            Ready to connect with new people? Join FriendApp now and start making connections that matter.
          </p>
          <a
            href="/signup"
            className="bg-gradient-to-r from-cyan-400 to-teal-500 text-white px-8 py-3 rounded-full text-lg font-semibold transform transition duration-300 hover:scale-105"
          >
            Sign Up Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
