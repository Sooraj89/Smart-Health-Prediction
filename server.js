import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();

// ✅ Middleware setup
app.use(
  cors({
    origin: "http://localhost:3000", // React app
    credentials: true,
  })
);
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Schemas
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["doctor", "patient"], required: true },
});

const User = mongoose.model("User", userSchema);

///////////////////////////////////////////////////////
// 🧑‍⚕️ DOCTOR SIGNUP
///////////////////////////////////////////////////////
app.post("/api/doctor/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingDoctor = await User.findOne({ email, role: "doctor" });
    if (existingDoctor)
      return res.status(400).json({ message: "Doctor already registered!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = new User({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
    });
    await newDoctor.save();

    res.status(201).json({ message: "Doctor registered successfully!" });
  } catch (error) {
    console.error("Doctor Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

///////////////////////////////////////////////////////
// 🧑‍⚕️ DOCTOR LOGIN
///////////////////////////////////////////////////////
app.post("/api/doctor/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await User.findOne({ email, role: "doctor" });
    if (!doctor)
      return res.status(404).json({ message: "Doctor not found!" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials!" });

    res.json({
      message: "Login successful!",
      name: doctor.name,
      email: doctor.email,
      role: doctor.role,
    });
  } catch (error) {
    console.error("Doctor Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

///////////////////////////////////////////////////////
// 🧍 PATIENT SIGNUP
///////////////////////////////////////////////////////
app.post("/api/patient/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingPatient = await User.findOne({ email, role: "patient" });
    if (existingPatient)
      return res.status(400).json({ message: "Patient already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = new User({
      name,
      email,
      password: hashedPassword,
      role: "patient",
    });
    await newPatient.save();

    res.status(201).json({ message: "Patient registered successfully!" });
  } catch (error) {
    console.error("Patient Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

///////////////////////////////////////////////////////
// 🧍 PATIENT LOGIN
///////////////////////////////////////////////////////
app.post("/api/patient/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await User.findOne({ email, role: "patient" });
    if (!patient)
      return res.status(404).json({ message: "Patient not found!" });

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials!" });

    res.json({
      message: "Login successful!",
      name: patient.name,
      email: patient.email,
      role: patient.role,
    });
  } catch (error) {
    console.error("Patient Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

///////////////////////////////////////////////////////
// ✅ Default route
///////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("Smart Health API Running ✅");
});

///////////////////////////////////////////////////////
// ✅ Start Server
///////////////////////////////////////////////////////
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
