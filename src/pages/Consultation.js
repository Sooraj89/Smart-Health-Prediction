import React, { useState } from "react";

const Checkup = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    issue: "",
    department: "",
    mode: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 10px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          width: "100%",
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* Left Image Section */}
        <div
          style={{
            flex: 1,
            backgroundImage: "url('/images/consult.jpg')", // 👈 tu apni image ka naam de
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Right Form Section */}
        <div
          style={{
            flex: 1,
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "10px",
              color: "#00796b",
            }}
          >
            💻 Online Consultation
          </h1>
          <p style={{ color: "#555", marginBottom: "30px", fontSize: "16px" }}>
            Consult with top doctors online from the comfort of your home. Get
            instant medical advice and digital prescriptions.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="text"
              name="issue"
              placeholder="Health Issue / Symptoms"
              value={formData.issue}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Department</option>
              <option value="general">General Physician</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="dermatology">Dermatology</option>
              <option value="gynecology">Gynecology</option>
              <option value="pediatrics">Pediatrics</option>
            </select>

            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Consultation Mode</option>
              <option value="video">Video Call</option>
              <option value="chat">Chat</option>
              <option value="audio">Audio Call</option>
            </select>

            <button
              type="submit"
              style={{
                backgroundColor: "#00796b",
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#00695c")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#00796b")}
            >
              Consult Now
            </button>
          </form>

          {submitted && (
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#e8f5e9",
                color: "#2e7d32",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              ✅ Your consultation request has been submitted successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ✅ Common Input Style
const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  outline: "none",
  transition: "0.2s",
};

export default Checkup;
