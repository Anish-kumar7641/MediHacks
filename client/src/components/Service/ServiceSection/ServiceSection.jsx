import "./ServiceSection.css";

// Replace these with actual paths to your icons
import icon1 from "../../../assets/icon.png";
import icon2 from "../../../assets/icon.png";
import icon3 from "../../../assets/icon.png";
import icon4 from "../../../assets/icon.png";
import ServiceCard from "../ServiceCard/ServiceCard";

const services = [
  {
    icon: icon1,
    title: "24 Hours Service",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: icon2,
    title: "Qualified Doctor",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: icon3,
    title: "Emergency Care",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: icon4,
    title: "Operation Theater",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const ServicesSection = () => {
  return (
    <div className="service-wrapper">
      <div className="service-heading">WHAT WE CAN HELP WITH</div>
      <div className="services-sub-heading">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis modi quod tempore ut facilis fugit tenetur animi praesentium nostrum quo vero quos aspernatur delectus dolor atque officiis cupiditate, mollitia ea?</div>
      <div className="services-section">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
