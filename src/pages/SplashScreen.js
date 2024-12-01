import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path based on your folder structure
import '../styles/SplashScreen.css'; // Import the updated CSS file

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/details'); // Redirect to the details page
    }, 2000);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};

export default SplashScreen;
