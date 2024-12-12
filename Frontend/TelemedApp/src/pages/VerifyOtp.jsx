import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './VerifyOtp.css';
import { useAuth } from '../context/AuthContext';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setOtp(value);
    setError('');
  };

  const handleVerify = async () => {
    if (otp.length !== 8) {
      setError('Please enter all 8 characters');
      return;
    }

    console.log('Attempting to verify OTP:', {
      email: location.state?.email,
      otp: otp
    });

    try {
      const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: location.state?.email,
          otp: otp
        })
      });

      const data = await response.json();
      console.log('OTP verification response:', data);

      if (response.ok) {
        const success = await login(data);
        if (success) {
          navigate('/patient/dashboard');
        } else {
          setError('Failed to process login data');
        }
      } else {
        console.error('OTP verification failed:', data);
        setError(data.error || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setError('Verification failed. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    
    console.log('Attempting to resend OTP for email:', location.state?.email);
    setIsResending(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: location.state?.email
        })
      });

      const data = await response.json();
      console.log('Resend OTP response:', data);

      if (response.ok) {
        setTimer(30);
        setOtp('');
        if (data.message) {
          setError('');
        }
      } else {
        console.error('Failed to resend OTP:', data);
        setError(data.error || 'Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Resend error:', error);
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="verify-otp-page">
      <Navbar />
      <div className="verify-otp-container">
        <div className="verify-otp-card">
          <div className="verify-otp-header">
            <h2>Verify Your Email</h2>
            <p>
              We've sent a verification code to<br />
              <strong>{location.state?.email}</strong>
            </p>
          </div>

          <div className="otp-input-container">
            <input
              type="text"
              value={otp}
              onChange={handleInputChange}
              placeholder="Enter verification code"
              maxLength={8}
              className={error ? 'error' : ''}
              autoComplete="off"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="verify-button"
            onClick={handleVerify}
            disabled={otp.length !== 8}
          >
            Verify Email
          </button>

          <div className="resend-section">
            <button
              className="resend-button"
              onClick={handleResendOtp}
              disabled={timer > 0 || isResending}
            >
              {isResending ? 'Resending...' : 'Resend Code'}
              {timer > 0 && ` (${timer}s)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;