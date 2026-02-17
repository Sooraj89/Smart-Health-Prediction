import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HealthPrediction = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    symptoms: "",
  });
  const [result, setResult] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔮 Basic prediction logic (demo)
    if (formData.symptoms.toLowerCase().includes("fever")) {
      setResult("You might have common flu. Please take rest and stay hydrated.");
    } else if (formData.symptoms.toLowerCase().includes("chest pain")) {
      setResult("Possible heart issue. Please consult a cardiologist immediately.");
    } else if (formData.symptoms.toLowerCase().includes("headache")) {
      setResult("It could be stress or migraine. Try to relax and rest well.");
    } else {
      setResult("Unable to predict. Please visit a doctor for proper diagnosis.");
    }
  };

  return (
    <>
      <Navbar />
      <section
        className="py-5"
        style={{ background: "#f8f9fa", minHeight: "100vh" }}
      >
        <div className="container">
          <h2 className="text-center mb-4 text-primary">Health Prediction</h2>
          <div
            className="card shadow-lg p-4 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Age</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Weight (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Height (cm)</label>
                <input
                  type="number"
                  className="form-control"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Symptoms</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  placeholder="e.g. fever, cough, headache..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100 fw-bold text-dark"
              >
                Predict Health Issue
              </button>
            </form>

            {result && (
              <div className="alert alert-info mt-4 text-center fw-semibold">
                {result}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HealthPrediction;
