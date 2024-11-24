import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Home from './components/home/home';

import { ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />

              <Route path="/" element={<h1>Welcome to the App</h1>} />
            </Routes>
          </div>
          
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
      </Router>
    );
  }
}

export default App;
