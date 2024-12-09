import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import   Footer from "../home/homeFooter" 


const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [skill, setSkill] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!firstName || !lastName || !email || !password || !gender || !age) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
        firstName,
        lastName,
        emailid: email,
        age,
        password,
        gender,
        address,
        skill,
      });

      toast.success("Signup successful! Please log in.", {
        position: "top-right",
        autoClose: 5000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      toast.error("Signup failed. Please try again.");
      setError("Signup failed. Please try again.");
    }
  };

  return (
    
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600">
              <Navbar/>

      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden mb-16">
        <div className="flex-1 bg-indigo-100 flex flex-col items-center justify-center p-8">
          <h2 className="text-3xl font-bold text-gray-700 mt-12">Welcome to FriendMe!</h2>
          <p className="text-gray-600 mt-2 text-center max-w-sm">
            Join our community and never miss out on events again.
          </p>
        </div>
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-700 text-center ">Create an Account</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Signup;
