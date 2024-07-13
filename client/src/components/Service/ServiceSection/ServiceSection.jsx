import './ServiceSection.css';

// Replace these with actual paths to your icons
import icon1 from '../../../assets/services1.jpg';
import icon2 from '../../../assets/services2.jpg';
import icon3 from '../../../assets/services3.jpg';
import icon4 from '../../../assets/services4.jpg';
import ServiceCard from '../ServiceCard/ServiceCard';

const services = [
  { icon: icon1, title: 'Urine Monitoring', description: 'Comprehensive real-time tracking and analysis of urine health indicators to maintain optimal wellness.'},
  { icon: icon2, title: 'Urine Treatment', description: 'Innovative and advanced therapies designed to enhance and restore urinary tract health effectively.' },
  { icon: icon3, title: 'Precaution measure', description: 'Proactive and preventative steps to safeguard against potential urinary tract issues and maintain health.' },
  { icon: icon4, title: 'Cure', description: 'Effective and targeted treatments aimed at curing various urinary tract conditions and promoting recovery.' },
];

const ServicesSection = () => {
  return (
    <div className="services-section">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  );
};

export default ServicesSection;
