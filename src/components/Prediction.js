import React, { useState } from 'react';

const Prediction = () => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symptoms.trim()) {
      alert('Please enter symptoms.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Replace the URL below with your backend API endpoint
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setResult(data.prediction || 'No prediction received');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h2>Health Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="symptoms" className="form-label">
            Enter Symptoms (comma separated)
          </label>
          <input
            type="text"
            id="symptoms"
            className="form-control"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. fever, cough, headache"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {result && (
        <div className="alert alert-success mt-4" role="alert">
          Prediction Result: <strong>{result}</strong>
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default Prediction;
