import img from "../../assets/icon.png";
import './Technology.css';

const Technology = () => {
  const techData = [
    {
      id: 1,
      image: img,
    },
    {
      id: 2,
      image: img,
    },
    {
      id: 3,
      image: img,
    },
    {
      id: 4,
      image: img,
    },
    {
      id: 5,
      image: img,
    },
  ];

  return (
    <div className="technology-used">
      <div className="tech-heading">TECHNOLOGY USED</div>
      <div className="tech-tools">
        {techData.map((data) => (
          <img src={data.image} className="tech-tool" key={data.id} alt={`tech-${data.id}`} />
        ))}
      </div>
    </div>
  );
};

export default Technology;
