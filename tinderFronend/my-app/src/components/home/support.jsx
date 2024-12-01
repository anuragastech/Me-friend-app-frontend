import React, { useState } from "react";
import Navbar from "../navbar/navbar";

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
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white">
      <Navbar />

      <div className="max-w-screen-xl mx-auto px-4 pt-24 pb-16">
        {/* Support Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">Support Center</h2>
          <p className="text-lg text-cyan-300">
            We’re here to help! Find answers to your questions or get in touch with our support team.
          </p>
        </div>

        {/* FAQs Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-semibold text-white mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <h4 className="font-semibold text-xl">How do I create an account?</h4>
                <p className="text-lg">Simply click on the 'Sign Up' button on the homepage and follow the instructions to create a new account.</p>
              </div>

              <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <h4 className="font-semibold text-xl">Is my data secure?</h4>
                <p className="text-lg">Yes, we use end-to-end encryption to ensure your conversations and data are completely secure.</p>
              </div>

              <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <h4 className="font-semibold text-xl">How can I reset my password?</h4>
                <p className="text-lg">You can reset your password by clicking on the 'Forgot Password' link on the login page.</p>
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

        {/* Contact Details Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-semibold text-white mb-6">Get in Touch</h3>
          <p className="text-lg text-cyan-300 mb-4">
            If you need further assistance, feel free to contact us directly.
          </p>
          <div className="flex justify-center space-x-12">
            <div>
              <h4 className="text-xl text-white font-semibold">Email</h4>
              <p className="text-lg text-cyan-300">support@friendapp.com</p>
            </div>
            <div>
              <h4 className="text-xl text-white font-semibold">Phone</h4>
              <p className="text-lg text-cyan-300">+1 (800) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
