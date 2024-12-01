import React, { useState, useEffect } from 'react';
import firebaseService from '../services/firebaseService'; // Adjust the path if necessary

const PhoneNumberVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    try {
      // Setup reCAPTCHA when the component is mounted
      const recaptchaVerifier = firebaseService.setupRecaptcha();
      window.recaptchaVerifier = recaptchaVerifier; // Store it globally
    } catch (err) {
      console.error('Error setting up reCAPTCHA:', err);
      setError('Failed to initialize reCAPTCHA. Please refresh the page.');
    }
  }, []);

  const handlePhoneSubmit = async () => {
    setError('');
    setSuccessMessage('');
    try {
      // Validate phone number format
      if (!phoneNumber.startsWith('+')) {
        setError('Please include the country code in the phone number (e.g., +1XXXXXXXXXX).');
        return;
      }
      await firebaseService.sendVerificationCode(phoneNumber, window.recaptchaVerifier);
      setSuccessMessage('Verification code sent successfully. Please check your phone.');
    } catch (err) {
      console.error('Error sending verification code:', err);
      setError('Error sending verification code. Please ensure the phone number is correct.');
    }
  };

  const handleVerificationSubmit = async () => {
    setError('');
    setSuccessMessage('');
    try {
      const authenticatedUser = await firebaseService.verifyCode(verificationCode);
      setUser(authenticatedUser);
      setSuccessMessage('Phone number verified successfully!');
    } catch (err) {
      console.error('Error verifying code:', err);
      setError('Invalid verification code. Please try again.');
    }
  };

  return (
    <div className="phone-verification">
      <h2>Phone Number Verification</h2>
      {user ? (
        <div>
          <h3>Welcome, {user.phoneNumber}</h3>
          <p>Your phone number has been successfully verified.</p>
        </div>
      ) : (
        <div>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number with country code"
            />
            <button onClick={handlePhoneSubmit}>Send Verification Code</button>
          </div>

          <div>
            <label htmlFor="code">Verification Code:</label>
            <input
              type="text"
              id="code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter the code you received"
            />
            <button onClick={handleVerificationSubmit}>Verify Code</button>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneNumberVerification;
