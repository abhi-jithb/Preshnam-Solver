import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// Firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASURE_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set up reCAPTCHA verifier
const setupRecaptcha = () => {
  const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    size: 'invisible', // Invisible reCAPTCHA
  }, auth);
  return recaptchaVerifier;
};

// Send SMS verification code
const sendVerificationCode = async (phoneNumber, recaptchaVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    window.confirmationResult = confirmationResult;
    console.log('SMS sent');
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error; // Propagate the error for handling in the component
  }
};

// Verify code
const verifyCode = async (verificationCode) => {
  try {
    const result = await window.confirmationResult.confirm(verificationCode);
    const user = result.user;
    console.log('User signed in successfully:', user);
    return user; // Returning user data for further use (e.g., after successful login)
  } catch (error) {
    console.error('Error verifying code:', error);
    throw error; // Propagate the error for handling in the component
  }
};

export default {
  setupRecaptcha,
  sendVerificationCode,
  verifyCode,
};
