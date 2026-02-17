import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginDoctor = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/doctor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        console.log("Saved user:", JSON.parse(localStorage.getItem("user")));
        navigate("/dashboard"); // ✅ Redirect to Dashboard after successful login
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <h2>Doctor Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginDoctor;
