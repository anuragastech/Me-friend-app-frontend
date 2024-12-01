import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "./homeFooter"; // Make sure you import Footer properly

const Home = () => {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <Navbar />

      <div className="relative w-full h-screen bg-gray-900">
        {/* Heading Container */}
        <div className="absolute top-[22%] left-[5%] flex items-center w-full pl-8">
          <h1 className="text-white text-4xl font-bold leading-snug">
            Talk to strangers, <br /> Make friends!
          </h1>
        </div>

        {/* Buttons */}
        <div className="absolute top-[30%] left-[4%] flex space-x-4 pl-8">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
            Text Chat
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
            Video Chat
          </button>
        </div>

        {/* Animations Container */}
        <div className="absolute top-[10%] right-[50%] w-1/5 h-1/5">
          <img
            src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1733082374/rb_1476_flmdfh.png"
            alt="Animation"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
