import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat, faBrain, faXRay, faTooth } from "@fortawesome/free-solid-svg-icons";

const Departments = () => {
  const departments = [
    { title: 'Cardiology', desc: 'Heart-related treatments and care.', icon: faHeartbeat, color: '#dc3545' },
    { title: 'Neurology', desc: 'Brain and nervous system treatments.', icon: faBrain, color: '#0d6efd' },
    { title: 'Radiology', desc: 'X-rays and imaging services.', icon: faXRay, color: '#198754' },
    { title: 'Dental', desc: 'Oral health and dental care.', icon: faTooth, color: '#fd7e14' }
  ];

  const cardStyle = {
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer"
  };

  const hoverIn = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
  };

  const hoverOut = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  };

  const iconStyle = (bgColor) => ({
    backgroundColor: bgColor,
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1rem auto",
    color: "white",
    fontSize: "2rem"
  });

  return (
    <section className="container py-5">
      <h2 className="text-center mb-5">Our Departments</h2>
      <div className="row">
        {departments.map((dept, idx) => (
          <div key={idx} className="col-md-3 mb-4">
            <div
              className="card h-100 text-center"
              style={cardStyle}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              <div className="card-body">
                <div style={iconStyle(dept.color)}>
                  <FontAwesomeIcon icon={dept.icon} />
                </div>
                <h5 className="card-title">{dept.title}</h5>
                <p className="card-text">{dept.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Departments;
