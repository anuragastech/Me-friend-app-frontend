import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    // const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:3000/login', { emailId, password }, { withCredentials: true });
            console.log('Login successful:', response.data);

            // No need to save the token in local storage
            // navigate('/events');
        } catch (err) {
            if (err.response) {
                console.error('Error response:', err.response);
                setError(err.response.data.message || 'Login failed. Please check your credentials.');
            } else {
                console.error('Error:', err);
                setError('Network error. Please try again later.');
            }
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
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                        <p>
                            {/* If you are not a user! <a href="/signup">Sign Up</a> */}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;