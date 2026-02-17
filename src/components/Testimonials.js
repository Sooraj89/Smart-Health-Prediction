import React from "react";

const testimonialsListTop = [
  {
    name: "Ananya Sharma",
    review: "Amazing service! The doctors were kind and professional.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rohan Patel",
    review: "Ambulance service was quick and reliable!",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Priya Mehta",
    review: "I loved the health prediction feature. Very accurate!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Aman Verma",
    review: "Booking consultation online was super easy!",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
  },
];

const testimonialsListBottom = [
  {
    name: "Neha Singh",
    review: "Quick response and caring doctors!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rahul Kumar",
    review: "Professional and fast service. Highly recommend!",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Sneha Gupta",
    review: "Online consultation saved me a hospital visit!",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    name: "Arjun Reddy",
    review: "Everything from ambulance to checkup was smooth!",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section py-5" id="testimonials">
      <div className="container text-center">
        <h2 className="mb-5 text-primary fw-bold">Patient Testimonials</h2>

        {/* Top row - moves left to right */}
        <div className="scroll-wrapper">
          <div className="scroll-container top">
            {[...testimonialsListTop, ...testimonialsListTop].map(
              (testi, idx) => (
                <div
                  key={idx}
                  className="testimonial-card text-center p-4 shadow-sm rounded mx-3"
                >
                  <img
                    src={testi.image}
                    alt={testi.name}
                    className="rounded-circle mb-3"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                  <h6>{testi.name}</h6>
                  <p className="text-muted fst-italic">"{testi.review}"</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom row - moves right to left */}
        <div className="scroll-wrapper mt-5">
          <div className="scroll-container bottom">
            {[...testimonialsListBottom, ...testimonialsListBottom].map(
              (testi, idx) => (
                <div
                  key={idx}
                  className="testimonial-card text-center p-4 shadow-sm rounded mx-3"
                >
                  <img
                    src={testi.image}
                    alt={testi.name}
                    className="rounded-circle mb-3"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                  <h6>{testi.name}</h6>
                  <p className="text-muted fst-italic">"{testi.review}"</p>
                </div>
              )
            )}
          </div>
        </div>

        {}
        
      </div>

      <style jsx>{`
        .testimonials-section {
          background: linear-gradient(to right, #f0f8ff, #e6f7ff);
          overflow: hidden;
        }
        .scroll-wrapper {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
        }
        .scroll-container {
          display: inline-flex;
          align-items: center;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: 25s;
        }
        .scroll-container.top {
          animation-name: scroll-right;
        }
        .scroll-container.bottom {
          animation-name: scroll-left;
        }
        @keyframes scroll-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .testimonial-card {
          background: white;
          min-width: 250px;
          transition: transform 0.3s ease;
          border-radius: 20px;
        }
        .testimonial-card:hover {
          transform: scale(1.05);
        }
        .scroll-container:hover {
          animation-play-state: paused;
        }

       
      `}</style>
    </section>
  );
};

export default Testimonials;
