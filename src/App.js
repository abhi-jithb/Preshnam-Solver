import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import DetailsPage from './pages/DetailsPage';
import HomePage from './pages/HomePage'; // Assuming you have a HomePage component
import PhoneVerification from './components/PhoneVerification'; // Import the PhoneVerification component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/phone-verification" element={<PhoneVerification />} /> {/* Add the route for PhoneVerification */}
      </Routes>
    </Router>
  );
};

export default App;
