import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Signup from './components/signup/signup';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <Routes>
              {/* Define the /login route */}
              <Route path="/login" element={<Login />} />

              <Route path="/signup" element={<Signup />} />
              {/* Define a default route */}
              <Route path="/" element={<h1>Welcome to the App</h1>} />

            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
