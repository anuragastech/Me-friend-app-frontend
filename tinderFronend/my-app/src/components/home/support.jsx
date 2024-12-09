import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import   Footer from "./homeFooter" 


const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock delay to simulate submission
    setTimeout(() => {
      toast.success("Your inquiry has been submitted successfully!", {
        position: "top-center",
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });

      // Reset the form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    }, 1000); // Simulate 1-second delay
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white min-h-screen ">
      {/* Include Navbar */}
      <Navbar />

      {/* Toast Notification */}
      <ToastContainer />

      <div className="max-w-screen-xl mx-auto px-4 pt-24 pb-16 mb-10">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">Support Center</h2>
          <p className="text-lg text-cyan-300">
            We’re here to help! Find answers to your questions or get in touch with our support team.
          </p>
        </div>

        {/* FAQs and Contact Form */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* FAQs Section */}
          <div>
            <h3 className="text-3xl font-semibold text-white mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <h4 className="font-semibold text-xl">How do I create an account?</h4>
                <p className="text-lg">Click 'Sign Up' on the homepage and follow the instructions.</p>
              </div>
              <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <h4 className="font-semibold text-xl">Is my data secure?</h4>
                <p className="text-lg">We use end-to-end encryption for your data's safety.</p>
              </div>
              <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <h4 className="font-semibold text-xl">How can I reset my password?</h4>
                <p className="text-lg">Click 'Forgot Password' on the login page to reset it.</p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            <h3 className="text-3xl font-semibold text-white mb-6">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="6"
                  className="w-full p-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-400 to-teal-500 text-white px-8 py-3 rounded-full text-lg font-semibold transform transition duration-300 hover:scale-105"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
};

export default Support;
