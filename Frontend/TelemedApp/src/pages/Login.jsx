import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate('/verify-otp', { state: { email } });
        }, 2000);
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleLogin = async (credentials) => {
    const success = await login(credentials);
    if (success) {
      // For now, only handle patient role
      if (user.role === 'PATIENT') {
        navigate('/patient/dashboard');
      } else {
        // Temporary handling for other roles
        showNotification('This user type is not yet supported', 'info');
        navigate('/');
      }
    } else {
      // Show error message
    }
  };

  return (
    <div className="full-page login-page">
      <Navbar />
      <div className="container-fluid h-100">
        <div className="row h-100">
          {/* Left Side - Image Section */}
          <div className="col-md-6 login-image-section d-none d-md-flex">
            <div className="overlay"></div>
            <div className="content text-white p-5 align-self-center">
              <h2>Welcome Back!</h2>
              <p>
                Reconnect with your healthcare journey. 
                Seamless, secure, and always at your fingertips.
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="login-form-wrapper">
              <div className="text-center mb-4">
                <img 
                  src="/telemed-logo.svg" 
                  alt="TeleMed Logo" 
                  className="mb-3" 
                  style={{ maxWidth: '200px' }} 
                />
                <h2>Login to TeleMed</h2>
                <p className="text-muted">Access your personalized healthcare platform</p>
              </div>

              <form onSubmit={handleSubmit} className="login-form">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <div className="form-check">
                      <input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="rememberMe"
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-primary">Forgot Password?</a>
                  </div>
                </div>

                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg rounded-pill"
                  >
                    Login
                  </button>
                </div>

                <div className="text-center mt-3">
                  <p>
                    Don't have an account? 
                    <a href="/register" className="ms-2 text-primary">
                      Create Account
                    </a>
                  </p>
                </div>

                <div className="text-center mt-4">
                  <p className="text-muted">Or login with</p>
                  <div className="social-login">
                    <a href="#" className="btn btn-outline-primary me-2">
                      <i className="fab fa-google"></i>
                    </a>
                    <a href="#" className="btn btn-outline-primary me-2">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="btn btn-outline-primary">
                      <i className="fab fa-apple"></i>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 transform transition-all duration-500 ease-in-out">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Login Successful!</h3>
              <p className="mt-2 text-sm text-gray-500">
                Please check your email for the OTP verification code.
              </p>
              <div className="mt-4">
                <div className="inline-block h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="inline-block h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="inline-block h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
