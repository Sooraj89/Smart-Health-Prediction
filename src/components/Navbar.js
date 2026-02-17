import React, { useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id, e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -60;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid px-3">
        {/* 🔹 Logo + Brand */}
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#home">
          <img src={logo} alt="Logo" style={{ height: "35px", marginRight: "8px" }} />
          Smart Health
        </a>

        {/* 🔹 Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔹 Nav Items */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-2">
              <a className="nav-link" href="#home" onClick={(e) => handleScroll("home", e)}>Home</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="#services" onClick={(e) => handleScroll("services", e)}>Services</a>
            </li>
            <li className="nav-item mx-2">
             <a className="nav-link" href="#appointment" onClick={(e) => handleScroll("appointment", e)}>Appointment</a>

            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="#departments" onClick={(e) => handleScroll("departments", e)}>Departments</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="#testimonials" onClick={(e) => handleScroll("testimonials", e)}>Testimonials</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="#about" onClick={(e) => handleScroll("about", e)}>About Us</a>
            </li>
          </ul>
        </div>
      </div>

      {/* 🌈 Inline CSS */}
      <style jsx>{`
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .nav-link:hover {
          color: #ffc107;
          text-decoration: underline;
        }
        .navbar-brand {
          font-size: 1.4rem;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
