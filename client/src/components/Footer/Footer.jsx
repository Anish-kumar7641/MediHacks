import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>UrineVital</h2>
          <p>
          UrineVital was founded with a mission to provide comprehensive and innovative urine health solutions. Our dedicated team is committed to advancing urinary health through cutting-edge technology and personalized care, ensuring optimal wellness for all our clients.
          </p>
        </div>
        {/* <div className="footer-section">
          <h3>LINKS</h3>
          <ul>
            <li><a href="#">Service Areas</a></li>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contacts</a></li>
            <li><a href="#">Solutions</a></li>
          </ul>
        </div> */}
        <div className="footer-section">
          <h3>CONTACT</h3>
          <ul>
            <li><i className="fas fa-map-marker-alt"></i>580009,ittigati road,sattur colony,IIIT-DHARWAD</li>
            <li><i className="fas fa-phone"></i> +91-7644091103</li>
            <li><i className="fas fa-fax"></i> +91-8797668608</li>
            <li><i className="fas fa-envelope"></i>avinav04kashyap@gmail.com</li>
          </ul>
          <div className="social-media">
            <a href="#"><i className="fab fa-google-plus-g"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2024 All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
