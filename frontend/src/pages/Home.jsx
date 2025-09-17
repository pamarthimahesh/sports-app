// src/pages/Home.js
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="home">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/sports.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Section */}
      <div className="overlay">
        <h1 data-aos="fade-down">🏏 Book Your Playground</h1>
        <p data-aos="fade-up">
          Find, book and enjoy your favorite sports ground in seconds!
        </p>
        <div className="buttons" data-aos="zoom-in">
          <a href="/playgrounds" className="btn">Explore Playgrounds</a>
          <a href="/bookings" className="btn btn-outline">Book Now</a>
        </div>
      </div>

      {/* Features Section */}
      <section className="features">
        <div data-aos="fade-right" className="feature-card">
          <h2>⚡ Instant Booking</h2>
          <p>Reserve your ground quickly with just a few clicks.</p>
        </div>
        <div data-aos="fade-up" className="feature-card">
          <h2>🏟️ Multiple Grounds</h2>
          <p>Choose from cricket, football, badminton and more.</p>
        </div>
        <div data-aos="fade-left" className="feature-card">
          <h2>💳 Easy Payments</h2>
          <p>Secure and fast payments integrated directly.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
