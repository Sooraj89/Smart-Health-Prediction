import express from "express";

const router = express.Router();

// 🧠 Mock Symptom Database
const symptomData = {
  fever: ["Common Cold", "Flu", "Malaria"],
  cough: ["Common Cold", "COVID-19", "Bronchitis"],
  headache: ["Migraine", "Stress", "Dehydration"],
  chest_pain: ["Heart Disease", "Anxiety", "Acidity"],
  fatigue: ["Anemia", "Thyroid", "Diabetes"],
};

// 🩺 Predict illness based on symptoms
router.post("/", (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ message: "Please provide valid symptoms." });
    }

    // 🧩 Collect possible illnesses
    const possibleDiseases = [];
    symptoms.forEach((symptom) => {
      const diseases = symptomData[symptom.toLowerCase()];
      if (diseases) possibleDiseases.push(...diseases);
    });

    // 🧠 Count frequency of each disease
    const frequency = {};
    possibleDiseases.forEach((d) => {
      frequency[d] = (frequency[d] || 0) + 1;
    });

    // 🔍 Sort by most frequent match
    const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);

    res.json({
      symptoms,
      prediction: sorted.length
        ? sorted.map(([disease]) => disease)
        : ["No match found. Consult a doctor."],
    });
  } catch (error) {
    res.status(500).json({ message: "Error in prediction", error });
  }
});

export default router;
