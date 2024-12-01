import React from 'react';
import Feed from './feeds';
import Navbar from '../navbar/navbar';

const Home = () => {
  return (
    <div className="bg-purple-100"> 
      <Navbar />
      <Feed />
    </div>
  );
};

export default Home;
