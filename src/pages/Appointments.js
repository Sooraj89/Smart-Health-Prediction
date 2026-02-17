import React, { useEffect, useState } from "react";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch from MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctor = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(`http://localhost:5000/api/appointments/${doctor._id}`);
        setAppointments(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>📅 Appointments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={tableHeadStyle}>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((a, i) => (
                <tr key={i} style={tableRowStyle}>
                  <td>{a.patientName}</td>
                  <td>{new Date(a.date).toLocaleDateString()}</td>
                  <td>{a.time}</td>
                  <td>
                    <span
                      style={{
                        ...statusBadge,
                        background:
                          a.status === "Completed"
                            ? "#c8e6c9"
                            : a.status === "Pending"
                            ? "#ffe082"
                            : "#ef9a9a",
                        color:
                          a.status === "Completed"
                            ? "#2e7d32"
                            : a.status === "Pending"
                            ? "#f57f17"
                            : "#c62828",
                      }}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

const pageStyle = {
  padding: "40px",
  fontFamily: "'Poppins', sans-serif",
  background: "#f9fcff",
  minHeight: "100vh",
};

const headingStyle = {
  color: "#00796b",
  fontSize: "2em",
  marginBottom: "20px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  overflow: "hidden",
};

const tableHeadStyle = {
  background: "#00796b",
  color: "#fff",
  textAlign: "left",
  padding: "12px",
};

const tableRowStyle = {
  borderBottom: "1px solid #ddd",
  transition: "background 0.3s",
};

const statusBadge = {
  padding: "6px 14px",
  borderRadius: "8px",
  fontWeight: "bold",
};

export default Appointments;
