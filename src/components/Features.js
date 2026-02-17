import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaAmbulance,
  FaUserMd,
  FaHeartbeat,
  FaLaptopMedical,
} from "react-icons/fa";

const Features = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "24/7 Emergency",
      desc: "Always available for emergencies.",
      icon: <FaAmbulance />,
      path: "/emergency",
    },
    {
      title: "Qualified Doctors",
      desc: "Experienced and skilled medical professionals.",
      icon: <FaUserMd />,
      path: "/doctors",
    },
    {
      title: "Health Prediction",
      desc: "Predict your health risks using AI tools.",
      icon: <FaHeartbeat />,
      path: "/health-prediction",
    },
    {
      title: "Online Consultation",
      desc: "Consult our doctors anytime, anywhere.",
      icon: <FaLaptopMedical />,
      path: "/consultation",
    },
  ];

  return (
    <section className="container py-5" id="services">
      <h2 className="text-center mb-4 fw-bold">Our Services</h2>
      <div className="row">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="col-md-3 text-center mb-4"
            onClick={() => navigate(service.path)}
            style={{ cursor: "pointer" }}
          >
            <div
              className="card h-100 shadow-sm service-card"
              style={{
                transition: "transform 0.3s, box-shadow 0.3s",
                borderRadius: "12px",
              }}
            >
              <div className="card-body">
                <div
                  className="mb-3"
                  style={{ fontSize: "2.5rem", color: "#0d6efd" }}
                >
                  {service.icon}
                </div>
                <h5 className="card-title fw-semibold">{service.title}</h5>
                <p className="card-text text-muted">{service.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
      `}</style>
    </section>
  );
};

export default Features;
