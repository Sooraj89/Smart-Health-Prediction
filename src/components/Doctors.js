// src/components/Doctors.js
import React from "react";
import doctor1 from "../assets/doctor1.jpg";
import doctor2 from "../assets/doctor2.jpeg";
import doctor3 from "../assets/doctor3.jpg";
import doctor4 from "../assets/doctor4.jpg";

const doctorsList = [
  { name: "Dr. John Doe", specialization: "Cardiologist", image: doctor1 },
  { name: "Dr. Jane Smith", specialization: "Neurologist", image: doctor2 },
  { name: "Dr. Mike Johnson", specialization: "Pediatrician", image: doctor3 },
  { name: "Dr. Emily Davis", specialization: "Orthopedic", image: doctor4 },
];

const Doctors = () => {
  return (
    <section className="container py-5" id="doctors">
      <h2 className="text-center mb-5">Our Doctors</h2>
      <div className="row">
        {doctorsList.map((doctor, idx) => (
          <div key={idx} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm text-center doctor-card">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="rounded-circle mx-auto mt-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{doctor.name}</h5>
                <p className="card-text">{doctor.specialization}</p>
              </div>
              <div className="card-footer">
                <a
                  href="#appointment"
                  className="btn btn-primary btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("appointment");
                    if (element) {
                      const yOffset = -60; // navbar height offset
                      const y =
                        element.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inline CSS for hover */}
      <style jsx>{`
        .doctor-card:hover {
          transform: scale(1.05);
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
};

export default Doctors;
