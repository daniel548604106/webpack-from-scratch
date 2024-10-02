import { Link } from 'react-router-dom';
import React from 'react';
import './index.css';

const Home = () => {
  return (
    <div>
      home
      <Link to="about">About Us</Link>
    </div>
  );
};

export default Home;
