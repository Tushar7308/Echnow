import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={homeStyle}>
      <h1>Welcome to the Chat Application</h1>
      <div>
        <Link to="/register">
          <button style={buttonStyle}>Sign Up</button>
        </Link>
        <Link to="/login">
          <button style={buttonStyle}>Login</button>
        </Link>
      </div>
    </div>
  );
};

const homeStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f5f5f5',
};

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default Home;
