import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginChoice = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let tempErrors = {};
    if (formType === "signup" && !formData.name)
      tempErrors.name = "Full name required";
    if (!formData.email) tempErrors.email = "Email required";
    if (!formData.password) tempErrors.password = "Password required";
    if (formType === "signup" && formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    try {
      let url = "";
      if (formType === "signup") {
        url =
          userType === "doctor"
            ? "http://localhost:5000/api/doctor/signup"
            : "http://localhost:5000/api/patient/signup";
      } else {
        url =
          userType === "doctor"
            ? "http://localhost:5000/api/doctor/login"
            : "http://localhost:5000/api/patient/login";
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (formType === "login") {
          localStorage.setItem("user", JSON.stringify(data));
          setMessage({ text: "Login successful!", type: "success" });

          setTimeout(() => {
            if (data.role === "doctor" || data.user?.role === "doctor") {
              navigate("/doctor-dashboard");
            } else {
              navigate("/home");
            }
          }, 1000);
        } else {
          setMessage({ text: data.message, type: "success" });
          setFormType("login");
        }
      } else {
        setMessage({
          text: data.message || "Something went wrong",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: "Server error. Please try again.", type: "error" });
    }
  };

  const icons = [
    "https://img.icons8.com/ios-filled/50/21b6b2/stethoscope.png",
    "https://img.icons8.com/ios-filled/50/21b6b2/heart-monitor.png",
    "https://img.icons8.com/ios-filled/50/21b6b2/ambulance.png",
    "https://img.icons8.com/ios-filled/50/21b6b2/pill.png",
    "https://img.icons8.com/ios-filled/50/21b6b2/test-tube.png",
    "https://img.icons8.com/ios-filled/50/21b6b2/syringe.png",
    "https://img.icons8.com/ios-filled/50/21b6b2/hospital-room.png",
    "https://img.icons8.com/ios-filled/50/21b6b2/doctor-male.png",
  ];

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    background: "linear-gradient(135deg, #e0f7fa, #f5fffe)",
    fontFamily: "'Poppins', sans-serif",
  };
  const leftStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const rightStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    position: "relative",
    padding: "0 40px",
  };
  const cardStyle = {
    width: "100%",
    maxWidth: "400px",
    padding: "35px",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
    textAlign: "center",
    backdropFilter: "blur(8px)",
  };
  const buttonStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#00796b",
    color: "white",
    transition: "0.3s",
  };
  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    outline: "none",
  };

  const renderInitialButtons = () => (
    <>
      <motion.h1
        style={{ color: "#00796b", fontWeight: "bold", fontSize: "30px" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Smart Health Prediction
      </motion.h1>
      <p style={{ color: "#555", marginBottom: "25px" }}>
        AI-powered diagnosis & doctor appointment system
      </p>
      <motion.button
        style={buttonStyle}
        onClick={() => setUserType("patient")}
        whileHover={{ scale: 1.05 }}
      >
        Continue as Patient
      </motion.button>
      <motion.button
        style={buttonStyle}
        onClick={() => setUserType("doctor")}
        whileHover={{ scale: 1.05 }}
      >
        Continue as Doctor
      </motion.button>
    </>
  );

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <h2 style={{ color: "#00796b", fontWeight: "bold", marginBottom: "15px" }}>
        {formType === "login"
          ? `${userType.toUpperCase()} Login`
          : `${userType.toUpperCase()} Signup`}
      </h2>

      {formType === "signup" && (
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        style={inputStyle}
      />
      {formType === "signup" && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={inputStyle}
        />
      )}

      <button type="submit" style={buttonStyle}>
        {formType === "login" ? "Login" : "Signup"}
      </button>

      {message.text && (
        <p
          style={{
            color: message.type === "success" ? "green" : "red",
            marginTop: "10px",
          }}
        >
          {message.text}
        </p>
      )}

      <p style={{ marginTop: "10px", fontSize: "14px" }}>
        {formType === "login" ? (
          <>
            Don't have an account?{" "}
            <span
              style={{ color: "#00796b", cursor: "pointer" }}
              onClick={() => setFormType("signup")}
            >
              Signup
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              style={{ color: "#00796b", cursor: "pointer" }}
              onClick={() => setFormType("login")}
            >
              Login
            </span>
          </>
        )}
      </p>
    </form>
  );

  return (
    <div style={containerStyle}>
      <div style={leftStyle}>
        <div style={cardStyle}>
          {!userType ? renderInitialButtons() : renderForm()}
        </div>
      </div>

      <div style={rightStyle}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            position: "relative",
          }}
        >
          {icons.map((icon, i) => {
            const angle = (i / icons.length) * 2 * Math.PI;
            const x = 90 * Math.cos(angle);
            const y = 90 * Math.sin(angle);
            return (
              <img
                key={i}
                src={icon}
                alt="icon"
                style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                  width: "40px",
                  height: "40px",
                }}
              />
            );
          })}
        </motion.div>

        <div style={{ marginTop: "25px", maxWidth: "400px" }}>
          <h2 style={{ color: "#00796b", fontWeight: "bold" }}>
            Smart Health Prediction
          </h2>
          <p style={{ color: "#004d40", fontSize: "15px", lineHeight: "1.6" }}>
            Your AI-driven healthcare assistant for symptom prediction and
            online doctor appointments — anytime, anywhere.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginChoice;
