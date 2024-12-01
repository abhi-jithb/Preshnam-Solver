import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa'; // Importing settings icon from react-icons

const HomePage = () => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    // You can implement the settings logic here
    console.log('Settings clicked');
  };

  return (
    <div className="home-page">
      <div className="header">
        <h1>Welcome Home</h1>
        <FaCog className="settings-icon" onClick={handleSettingsClick} />
      </div>
      <button onClick={() => navigate('/details')}>Go to Details</button>
      
      {/* Add a new button to navigate to the Phone Verification page */}
      <button onClick={() => navigate('/phone-verification')}>
        Verify Phone Number
      </button>
    </div>
  );
};

export default HomePage;
