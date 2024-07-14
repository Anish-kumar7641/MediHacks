import React from 'react';
import img1 from "../../assets/tech1.png";
import img2 from "../../assets/tech2.png";
import img3 from "../../assets/tech3.png";
import img4 from "../../assets/tech4.png";
import img5 from "../../assets/tech5.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Technology.css';

const Technology = () => {
  const techData = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
  ];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="technology-used">
      <div className="tech-heading">TECHNOLOGY USED</div>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={1500}
        infinite={true}
        showDots={false}
        arrows={false}
      >
        {techData.map((data) => (
          <img src={data.image} className="tech-tool" key={data.id} alt={`tech-${data.id}`} />
        ))}
      </Carousel>
    </div>
  );
};

export default Technology;
