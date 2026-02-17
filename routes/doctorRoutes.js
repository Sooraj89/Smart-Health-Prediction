import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// 🟢 Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
});

// 🟡 Get single doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error });
  }
});

// 🔵 Get doctor's appointments (protected route)
router.get("/:id/appointments", protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.id })
      .populate("patient", "name email");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
});

export default router;
