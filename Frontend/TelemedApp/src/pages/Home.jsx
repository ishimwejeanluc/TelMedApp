import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const features = [
    {
      icon: 'fa-video',
      title: 'Virtual Consultations',
      description: 'Connect with top healthcare professionals from the comfort of your home.'
    },
    {
      icon: 'fa-calendar-check',
      title: 'Easy Scheduling',
      description: 'Book appointments with just a few clicks, anytime, anywhere.'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Secure & Private',
      description: 'Your health information is protected with state-of-the-art security.'
    }
  ];

  return (
    <div className="home-page full-page">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-lg-6 text-white">
              <h1 className="display-4 mb-4">
                Your Health, Our Priority
              </h1>
              <p className="lead mb-4">
                Experience healthcare reimagined with TeleMed. 
                Convenient, compassionate, and cutting-edge medical care at your fingertips.
              </p>
              <div className="d-flex gap-3">
                <Link 
                  to="/register" 
                  className="btn btn-primary btn-lg rounded-pill px-4"
                >
                  Get Started
                </Link>
                <Link 
                  to="/about" 
                  className="btn btn-outline-light btn-lg rounded-pill px-4"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img 
                src="/medical-hero.png" 
                alt="TeleMed Healthcare" 
                className="img-fluid rounded-4 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="feature-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Why Choose TeleMed?</h2>
            <p className="text-muted lead">
              Transforming healthcare with technology and compassion
            </p>
          </div>
          <div className="row">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="feature-card text-center h-100">
                  <div className="mb-3">
                    <i 
                      className={`fas ${feature.icon} text-primary-color fa-3x`}
                    ></i>
                  </div>
                  <h3 className="h4 mb-3">{feature.title}</h3>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2>Ready to Take Control of Your Health?</h2>
              <p className="lead text-muted">
                Join thousands of patients who have transformed their 
                healthcare experience with TeleMed.
              </p>
            </div>
            <div className="col-lg-4 text-end">
              <Link 
                to="/register" 
                className="btn btn-primary btn-lg rounded-pill px-4"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
