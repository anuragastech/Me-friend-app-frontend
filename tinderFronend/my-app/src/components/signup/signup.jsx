import React, { useState } from "react";
import axios from "axios";
import './signup.css'; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; 


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
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate inputs
    if (!firstName || !lastName || !email || !password || !gender || !age) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
        const response = await axios.post("http://localhost:3000/signup", {
          firstName,
          lastName,
          emailid: email,  // Ensure the field name is emailId
          age,
          password,
          gender,
          address,
          skill,
        });
      
        toast.success("Signup successful! Please log in.", {
          position: "top-right",   // Position of the notification
          autoClose: 5000,         // Duration in milliseconds (5000ms = 5 seconds)
          hideProgressBar: false,  // Show or hide progress bar
          closeOnClick: true,      // Close notification when clicked
          pauseOnHover: true,      // Pause notification when hovered
        });       

        setTimeout(() => {
          navigate("/login"); // Redirect to /login
        }, 5000);


        setFirstName("");
        setLastName("");
        setEmail("");
        setAge("");
        setPassword("");
        setConfirmPassword("");
        setGender("");
        setAddress("");
        setSkill("");
      } catch (err) {
        toast.error(err.response?.data?.message || "Signup failed. Please try again.");
        setError(err.response?.data?.message || "Signup failed. Please try again.");
      }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-image">
          <h2>Welcome to friendme!</h2>
          <p>Join our community and never miss out on events again.</p>
        </div>
        <div className="signup-form-container">
          <h1>Create an Account</h1>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="text"
              placeholder="Skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
