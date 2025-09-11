import React from "react";
import "../Style/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">👋 About Us</h2>
      <p className="about-text">
        Welcome to <strong>BENZAMOD</strong>— your one-stop destination for
        high-quality wraps, exhausts, lights, and seats for your ride. 🚀
      </p>

      <div className="about-grid">
        <div className="about-card">
          <h3>🎯 Our Mission</h3>
          <p>
            To provide premium automotive accessories that upgrade your vehicle’s
            performance and style while ensuring reliability and affordability.
          </p>
        </div>

        <div className="about-card">
          <h3>💡 Why Choose Us?</h3>
          <ul>
            <li>✔️ Wide range of bike & car accessories</li>
            <li>✔️ Quality guaranteed products</li>
            <li>✔️ Affordable pricing</li>
            <li>✔️ Friendly customer support</li>
          </ul>
        </div>

        <div className="about-card">
          <h3>🤝 Our Promise</h3>
          <p>
            Every product we deliver is carefully selected to ensure your ride
            gets the best. Your satisfaction is our top priority!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
