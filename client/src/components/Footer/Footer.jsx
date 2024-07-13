import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>UrineVital</h2>
          <p>
            When Stan Britten established BritKare in 1995, he did so with a true desire to assist the medical community with the quality care of their desire.
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
            <li><i className="fas fa-map-marker-alt"></i> 777, Seventh Avenue, India, NE 5849</li>
            <li><i className="fas fa-phone"></i> +788-698-758</li>
            <li><i className="fas fa-fax"></i> +788-698-758</li>
            <li><i className="fas fa-envelope"></i> urinevital@gmail.com</li>
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
