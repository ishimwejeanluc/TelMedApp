import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement contact form submission logic
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h1>Contact TeleMed</h1>
            <p className="lead">We're Here to Help</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea 
                  className="form-control" 
                  id="message" 
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
          <div className="col-md-6">
            <div className="card bg-light">
              <div className="card-body">
                <h4>Contact Information</h4>
                <p>
                  <strong>Address:</strong> 123 Healthcare Lane, Medical City, HC 12345
                </p>
                <p>
                  <strong>Phone:</strong> (555) 123-4567
                </p>
                <p>
                  <strong>Email:</strong> support@telemed.com
                </p>
                <div className="mt-4">
                  <h5>Support Hours</h5>
                  <p>Monday - Friday: 8am - 8pm EST<br />
                  Saturday: 10am - 4pm EST<br />
                  Sunday: Closed</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#" className="text-primary me-3"><i className="fab fa-facebook fa-2x"></i></a>
                <a href="#" className="text-info me-3"><i className="fab fa-twitter fa-2x"></i></a>
                <a href="#" className="text-danger me-3"><i className="fab fa-instagram fa-2x"></i></a>
                <a href="#" className="text-primary"><i className="fab fa-linkedin fa-2x"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
