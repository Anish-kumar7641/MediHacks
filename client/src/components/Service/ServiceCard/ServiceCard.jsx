import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ icon, title, description, highlighted }) => {
  return (
    <div className="service-card">
      <div className="icon">
        <img src={icon} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ServiceCard;
