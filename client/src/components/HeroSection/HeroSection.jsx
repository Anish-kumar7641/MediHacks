import React from 'react';
import './HeroSection.css';
// import phoneImage from '../assets/phone.png'; // Import your image here

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1>A Wealth of Experience To Heal And Help You.</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
        <div className="hero-buttons">
          <button>Start Analysis</button>
        </div>
      </div>
      <div className="hero-image">
        <img src="https://static.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg" alt="Phone" />
      </div>
    </section>
  );
};

export default HeroSection;
