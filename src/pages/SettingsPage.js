import React, { useState } from 'react';
import Button from '../components/Button'; // Import the Button component

const SettingsPage = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmitFeedback = () => {
    alert('Feedback Submitted!');
    setFeedback('');
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <div>
        <h3>Share Your Experience</h3>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Your feedback here"
        ></textarea>
        <Button
          text="Submit Feedback"
          onClick={handleSubmitFeedback}
          type="primary"
        />
      </div>
    </div>
  );
};

export default SettingsPage;
