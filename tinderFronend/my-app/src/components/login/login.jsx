import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:3002/login',
                { emailId, password },
                { withCredentials: true } // Ensures cookies are included
            );

            // Notify the user of success
            toast.success("Login successful!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });

            console.log("Cookies in the browser:", document.cookie);

            setTimeout(() => {
                navigate("/Home");
            }, 5000);

        } catch (err) {
            if (err.response) {
                console.error('Error response:', err.response);
                setError(err.response.data.error || 'Login failed. Please check your credentials.');
            } else {
                console.error('Error:', err);
                setError('Network error. Please try again later.');
            }
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-image">
                    <h2>Welcome Back!</h2>
                    <p>Please log in to continue.</p>
                </div>
                <div className="login-form-container">
                    <h1>Login</h1>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
