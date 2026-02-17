import React, { useState } from 'react';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    department: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const departments = ['General Medicine', 'Cardiology', 'Dermatology', 'Pediatrics'];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, date, time, department } = formData;

    if (!name || !email || !date || !time || !department) {
      setError('Please fill all fields');
      return;
    }

    setError(null);

    try {
      // Replace with your backend API endpoint for appointment booking
      const response = await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to book appointment');

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        department: '',
      });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  if (submitted) {
    return (
      <div className="alert alert-success mt-4">
        Appointment booked successfully!
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2>Book an Appointment</h2>
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
          <label className="form-label">Date:</label>
          <input 
            type="date" 
            name="date" 
            className="form-control" 
            value={formData.date} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time:</label>
          <input 
            type="time" 
            name="time" 
            className="form-control" 
            value={formData.time} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Department:</label>
          <select 
            name="department" 
            className="form-select" 
            value={formData.department} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept, i) => (
              <option key={i} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {error && (
          <div className="alert alert-danger mb-3" role="alert">
            {error}
          </div>
        )}

        <button type="submit" className="btn btn-success">Book Appointment</button>
      </form>
    </div>
  );
};

export default Appointment;
