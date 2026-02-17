import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HealthPredictionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    bloodPressure: "",
    sugarLevel: "",
    symptoms: "",
    lifestyle: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const { age, weight, height, bloodPressure, sugarLevel, lifestyle } = formData;
      let prediction = "";
      let suggestion = "";
      let doctor = "";

      // Basic fake AI logic
      if (bloodPressure && parseInt(bloodPressure.split("/")[0]) > 130) {
        prediction = "You may have mild hypertension.";
        suggestion = "Reduce salt intake and manage stress.";
        doctor = "Dr. Kshitij Charaya (Cardiologist)";
      } else if (sugarLevel && sugarLevel > 140) {
        prediction = "You might be at risk of diabetes.";
        suggestion = "Avoid sugary foods and exercise daily.";
        doctor = "Dr. Ayesha Sharma (Endocrinologist)";
      } else if (age > 50 && lifestyle === "Sedentary") {
        prediction = "You might face joint or cholesterol issues.";
        suggestion = "Start light exercises and get regular checkups.";
        doctor = "Dr. Ramesh Mehta (General Physician)";
      } else {
        prediction = "You seem healthy! Keep maintaining your lifestyle.";
        suggestion = "Continue eating balanced meals and stay active.";
        doctor = "—";
      }

      setResult({ prediction, suggestion, doctor });
      setLoading(false);
    }, 1500);
  };

  return (
    <div
      className="container my-5 p-4 rounded-4 shadow-lg"
      style={{
        maxWidth: "800px",
        background: "linear-gradient(135deg, #e8f7f1, #ffffff)",
      }}
      id="prediction"
    >
      <h2 className="text-center mb-4 text-success fw-bold">
        🩺 Smart Health Checkup
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="form-control"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <select
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-md-4">
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              className="form-control"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              className="form-control"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="bloodPressure"
              placeholder="Blood Pressure (e.g. 120/80)"
              className="form-control"
              value={formData.bloodPressure}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="number"
              name="sugarLevel"
              placeholder="Sugar Level (mg/dL)"
              className="form-control"
              value={formData.sugarLevel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <select
              name="lifestyle"
              className="form-select"
              value={formData.lifestyle}
              onChange={handleChange}
              required
            >
              <option value="">Lifestyle</option>
              <option>Sedentary</option>
              <option>Active</option>
              <option>Very Active</option>
            </select>
          </div>

          <div className="col-12">
            <textarea
              name="symptoms"
              placeholder="Describe your symptoms..."
              className="form-control"
              rows="3"
              value={formData.symptoms}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            type="submit"
            className="btn btn-success px-4 py-2 fw-bold"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "🔍 Predict Health"}
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center mt-3">
          <div className="spinner-border text-success" role="status"></div>
          <p className="text-muted mt-2">Analyzing your health data...</p>
        </div>
      )}

      {result && (
        <div className="mt-5 p-4 rounded-3 text-center bg-white shadow-sm border">
          <h4 className="text-success fw-bold">{result.prediction}</h4>
          <p className="text-muted mb-2">{result.suggestion}</p>
          <p className="fw-semibold text-primary">
            👨‍⚕️ Recommended Doctor: {result.doctor}
          </p>
        </div>
      )}
    </div>
  );
};

export default HealthPredictionForm;
