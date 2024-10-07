import React from 'react';
import './HeroSection.css';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
     
    <section className="hero-section">
      <div className="hero-text">
        <h1>Your Partner in Comprehensive Urine Health Solutions.</h1>
        <p>Our state-of-the-art services offer unparalleled expertise in urine monitoring, treatment, and preventative care. With years of experience, we are dedicated to ensuring your urinary health through advanced technology and personalized care.</p>
        <div className="hero-buttons">
          <Link to="/analyzer" className='btn'>
            <button className="blob-btn">
              Start Analysis
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                </span>
              </span>
            </button>
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="hero-image">
        <DotLottiePlayer
          src="https://lottie.host/2e689f2b-27b6-4232-b0d5-cf4a80a863db/ckZyQmMK1A.json"
          background="transparent"
          speed={1}
          style={{ width: '400px', height: '400px' }}
          loop
          autoplay
        />
      </div>
    </section>
  );
};

export default HeroSection;
