import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const iconStyle = { transition: "color 0.3s ease", fontSize: "1.2rem" };

  // 🔴 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login/choice", { replace: true });
  };

  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5" style={{ position: "relative" }}>
      <div className="container">
        <div className="row">
          {/* 🩺 Left Section */}
          <div className="col-md-4 mb-3">
            <h5 className="text-primary fw-bold">Smart Health</h5>
            <p>Advanced healthcare solutions for your well-being.</p>
          </div>

          {/* ⚡ Middle Section */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              {["home", "services", "departments", "doctors", "appointments"].map((sec, idx) => (
                <li key={idx}>
                  <Link
                    to={sec}
                    spy
                    smooth
                    offset={-70}
                    duration={500}
                    className="text-light text-decoration-none"
                    style={{ cursor: "pointer" }}
                  >
                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 📞 Right Section */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Contact Us</h6>
            <p>Email: info@smarthealth.com</p>
            <p>Phone: +91 123 456 7890</p>
            <div className="d-flex gap-3 mt-2">
              {[
                { icon: <FaFacebookF />, link: "https://facebook.com" },
                { icon: <FaTwitter />, link: "https://twitter.com" },
                { icon: <FaInstagram />, link: "https://instagram.com" },
                { icon: <FaLinkedinIn />, link: "https://linkedin.com" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light"
                  style={iconStyle}
                  onMouseEnter={(e) => (e.target.style.color = "yellow")}
                  onMouseLeave={(e) => (e.target.style.color = "white")}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="bg-secondary" />
        <div className="text-center">
          &copy; {new Date().getFullYear()} Smart Health. All rights reserved.
        </div>

        {/* 🔴 Logout Button — Footer ke bilkul corner me */}
        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            bottom: "15px",
            right: "25px",
            backgroundColor: "#d9534f",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          Logout
        </button>
      </div>
    </footer>
  );
};

export default Footer;
