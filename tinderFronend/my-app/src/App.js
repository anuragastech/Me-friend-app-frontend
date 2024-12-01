import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/login/login';
import Signup from './components/signup/signup';
import Feed from './components/Feed/feedPage';
import Requests from "./components/requestReceived/request"
import Connections from "./components/connections/connection"
import { ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";
import Profile from './components/profile/profile';
import ChatBox from  "./components/chatBox/chatBoxUi"
import  Home from "./components/home/Home"
import Vlog from './components/home/vlog';
import Support from './components/home/support';
import About from './components/home/about';
import "./index.css"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
       
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/signup" element={<Signup />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat/:connectionId" element={<ChatBox />} />

              <Route path="/about" element={<About />} />
              <Route path="/support" element={<Support />} />
              <Route path="/vlog" element={<Vlog />} />

              <Route path="/" element={<Home/>} />

              {/* <Route path="/" element={<Navigate to="/home" />} /> */}
              </Routes>
          </div>
          
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
      </Router>
    );
  }
}

export default App;
