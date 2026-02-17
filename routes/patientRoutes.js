import express from "express";
import protect from "../middleware/authMiddleware.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// 🟢 Get all patients (for admin/doctor view)
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().select("-password");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error });
  }
});

// 🟡 Get single patient by ID
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select("-password");
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
});

// 🔵 Get appointments by patient ID (protected)
router.get("/:id/appointments", protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.id })
      .populate("doctor", "name specialization");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
});

export default router;
