import express from "express";
import Appointment from "../models/Appointment.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ JWT protection

const router = express.Router();

// 🟢 Create appointment (only logged-in user)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
      createdBy: req.user.id, // logged-in user ID from JWT
    });
    await appointment.save();
    res.status(201).json({
      message: "✅ Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Error creating appointment", error });
  }
});

// 🟡 Get all appointments (Doctor/Admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name specialization");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
});

// 🔵 Get appointments by patient ID
router.get("/patient/:id", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.id }).populate(
      "doctor",
      "name specialization"
    );
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient appointments", error });
  }
});

// 🔴 Delete appointment
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "🗑️ Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
});

// 🟠 Update appointment status
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "✅ Status updated", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
});

export default router;
