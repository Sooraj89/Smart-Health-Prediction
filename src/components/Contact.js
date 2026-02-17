import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setError('Please fill all fields');
      return;
    }

    setError(null);
    // For now, just simulate submission success
    setSubmitted(true);

    // You can replace this with real API call if backend exists
  };

  if (submitted) {
    return (
      <div className="alert alert-success mt-4">
        Thank you for contacting us! We will get back to you soon.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input 
            type="text" 
            name="name" 
            className="form-control" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input 
            type="email" 
            name="email" 
            className="form-control" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message:</label>
          <textarea 
            name="message" 
            className="form-control" 
            rows="4" 
            value={formData.message} 
            onChange={handleChange} 
            required
          ></textarea>
        </div>

        {error && (
          <div className="alert alert-danger mb-3">{error}</div>
        )}

        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
