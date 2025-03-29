import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Form } from 'react-bootstrap';
import '../styles/OTPVerification.css';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = () => {
    const enteredOTP = otp.join('');
    if (enteredOTP.length < 4) {
      setError('Please enter a valid 4-digit OTP.');
      return;
    }
    alert('OTP Verified Successfully!');
  };

  return (
    <div className="otp-container">
      <motion.div
        className="otp-box"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>OTP Verification</h2>
        <p>Enter the 4-digit OTP sent to your mobile/email.</p>

        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>

        {error && <p className="error-text">{error}</p>}

        <Button onClick={handleSubmit} className="verify-btn">
          Verify OTP
        </Button>
      </motion.div>
    </div>
  );
};

export default OTPVerification;
