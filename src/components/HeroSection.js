import React from "react";

const HeroSection = () => {
  const slides = [
    {
      img: "/images/hospital1.jpg",
      title: "Welcome to Smart Health",
      subtitle: "Advanced healthcare at your fingertips"
    },
    {
      img: "/images/hospital2.jpg",
      title: "Expert Doctors",
      subtitle: "Get treatment from the best specialists"
    },
    {
      img: "/images/hospital3.jpg",
      title: "Your Health, Our Priority",
      subtitle: "Book appointments & predict health risks easily"
    }
  ];

  return (
    <div
      id="heroCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="2000"
      style={{ marginTop: "60px" }}
    >
      <div className="carousel-inner">
        {slides.map((slide, idx) => (
          <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
            <img
              src={slide.img}
              alt={slide.title}
              style={{
                width: "100%",       // full width, stretched
                height: "500px",     // fixed height
                objectFit: "fill"    // stretch image to fill container
              }}
            />
            <div
              className="carousel-caption d-none d-md-block"
              style={{
                color: "black",
                textShadow: "1px 1px 5px rgba(255,255,255,0.7)"
              }}
            >
              <h2 className="fw-bold">{slide.title}</h2>
              <p style={{ fontSize: "1.1rem" }}>{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HeroSection;
