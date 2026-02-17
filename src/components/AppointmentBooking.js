import React, { useState } from "react";
import { FaUser, FaCalendarAlt, FaClock, FaEnvelope, FaUserMd } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import appointmentImg from "../assets/appointment.jpg"; // Image import karo yahan

const AppointmentBooking = () => {
  const [formData, setFormData] = useState({ name: "", email: "", date: "", time: "", specialist: "" });
  const [showModal, setShowModal] = useState(false);

  const specialists = [
    "Cardiologist",
    "Dentist",
    "Dermatologist",
    "Neurologist",
    "Orthopedic",
    "Pediatrician",
    "Psychiatrist",
    "General Physician",
  ];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setShowModal(true);
    setFormData({ name: "", email: "", date: "", time: "", specialist: "" });
  };

  return (
    <section id="appointment" className="py-5" style={{ background: "#e9ecef" }}>
      <div className="container">
        <h2 className="text-center mb-4">Book an Appointment</h2>
        <div className="row align-items-center">
          {/* Form Left */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg p-4">
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-3 position-relative">
                  <FaUser className="form-icon" />
                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3 position-relative">
                  <FaEnvelope className="form-icon" />
                  <input
                    type="email"
                    className="form-control ps-5"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* ✅ Specialist Dropdown Added */}
                <div className="mb-3 position-relative">
                  <FaUserMd className="form-icon" />
                  <select
                    className="form-select ps-5"
                    name="specialist"
                    value={formData.specialist}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Specialist --</option>
                    {specialists.map((spec, index) => (
                      <option key={index} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="mb-3 position-relative">
                  <FaCalendarAlt className="form-icon" />
                  <input
                    type="date"
                    className="form-control ps-5"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Time */}
                <div className="mb-3 position-relative">
                  <FaClock className="form-icon" />
                  <input
                    type="time"
                    className="form-control ps-5"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-warning w-100 fw-bold">
                  Book Appointment
                </button>
              </form>
            </div>
          </div>

          {/* Image Right */}
          <div className="col-md-6 text-center">
            <img
              src={appointmentImg}
              alt="Appointment"
              className="img-fluid rounded shadow-lg"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Confirmed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your appointment with <strong>{formData.specialist || "the selected specialist"}</strong> has been booked
            successfully!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .form-icon {
          position: absolute;
          top: 50%;
          left: 15px;
          transform: translateY(-50%);
          color: #ffc107;
        }
        input:focus,
        select:focus {
          border-color: #ffc107;
          box-shadow: 0 0 5px #ffc107;
        }
      `}</style>
    </section>
  );
};

export default AppointmentBooking;
