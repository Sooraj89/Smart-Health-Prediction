import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

/* ---------------------- DOCTOR SIGNUP ---------------------- */
router.post("/signup/doctor", async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    // Check if doctor already exists
    const existing = await Doctor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      specialization,
    });
    await doctor.save();

    res.status(201).json({ message: "Doctor registered successfully!" });
  } catch (err) {
    console.error("Doctor Signup Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ---------------------- PATIENT SIGNUP ---------------------- */
router.post("/signup/patient", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Patient.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const patient = new Patient({ name, email, password: hashedPassword });
    await patient.save();

    res.status(201).json({ message: "Patient registered successfully!" });
  } catch (err) {
    console.error("Patient Signup Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ---------------------- DOCTOR LOGIN ---------------------- */
router.post("/login/doctor", async (req, res) => {
  try {
    console.log("✅ Doctor login route hit");

    const { email, password } = req.body;
    console.log("🔹 Email:", email);
    console.log("🔹 Password:", password);

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      console.log("❌ Doctor not found");
      return res.status(400).json({ message: "Doctor not found" });
    }

    console.log("🔹 Stored Hashed Password:", doctor.password);

    const isMatch = await bcrypt.compare(password, doctor.password);
    console.log("🔹 Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(doctor._id, "doctor");
    console.log("✅ Token generated successfully");

    res.json({
      message: "Doctor login successful",
      token,
      name: doctor.name,
      email: doctor.email,
    });
  } catch (err) {
    console.error("Doctor Login Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ---------------------- PATIENT LOGIN ---------------------- */
router.post("/login/patient", async (req, res) => {
  try {
    console.log("✅ Patient login route hit");

    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });

    if (!patient) {
      console.log("❌ Patient not found");
      return res.status(400).json({ message: "Patient not found" });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    console.log("🔹 Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(patient._id, "patient");
    console.log("✅ Token generated successfully");

    res.json({
      message: "Patient login successful",
      token,
      name: patient.name,
      email: patient.email,
    });
  } catch (err) {
    console.error("Patient Login Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
