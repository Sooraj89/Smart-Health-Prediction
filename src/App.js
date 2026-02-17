import { Routes, Route, Navigate } from "react-router-dom";
import LoginChoice from "./components/LoginChoice";
import Home from "./pages/Home";
import DoctorDashboard from "./pages/DoctorDashboard";
import Departments from "./components/Departments";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Emergency from "./pages/Emergency";
import Doctors from "./pages/Doctors";
import Consultation from "./pages/Consultation";
import HealthPrediction from "./pages/HealthPrediction";

function App() {
  return (
    <Routes>
      {/* Default route → login choice page */}
      <Route path="/" element={<Navigate to="/login/choice" replace />} />

      {/* 🔹 Public routes (accessible only if not logged in) */}
      <Route
        path="/login/choice"
        element={
          <PublicRoute>
            <LoginChoice />
          </PublicRoute>
        }
      />

      {/* 🔹 Patient protected routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute role="patient">
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/emergency"
        element={
          <ProtectedRoute role="patient">
            <Emergency />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors"
        element={
          <ProtectedRoute role="patient">
            <Doctors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consultation"
        element={
          <ProtectedRoute role="patient">
            <Consultation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/health-prediction"
        element={
          <ProtectedRoute role="patient">
            <HealthPrediction />
          </ProtectedRoute>
        }
      />

      {/* 🔹 Doctor protected route */}
      <Route
        path="/doctor-dashboard"
        element={
          <ProtectedRoute role="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login/choice" replace />} />
    </Routes>
  );
}

export default App;
