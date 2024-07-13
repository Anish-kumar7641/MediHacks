import React from 'react';
import './HeroSection.css';
 import hero from '../../assets/hero.png'; // Import your image here

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1>Your Partner in Comprehensive Urine Health Solutions.</h1>
        <p>Our state-of-the-art services offer unparalleled expertise in urine monitoring, treatment, and preventative care. With years of experience, we are dedicated to ensuring your urinary health through advanced technology and personalized care</p>
        <div className="hero-buttons">
          <button>Start Analysis</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={hero} alt="Phone" />
      </div>
    </section>
  );
};

export default HeroSection;
