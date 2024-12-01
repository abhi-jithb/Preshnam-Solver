import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebaseService from '../services/firebaseService'; // Adjust the path as needed
import '../styles/DetailsPage.css'; // Adjust the path as needed

const DetailsPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // Add user details via Firebase service
      await firebaseService.addUser(name, phone, location);
      navigate('/home'); // Navigate to HomePage upon success
    } catch (err) {
      console.error('Error occurred while saving details:', err);
      setError('An error occurred while saving your details. Please try again.');
    }
  };

  return (
    <div className="details-page-container">
      <h2>Enter Your Details</h2>
      <form className="details-form" onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DetailsPage;
