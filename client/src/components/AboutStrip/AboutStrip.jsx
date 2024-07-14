import "./AboutStrip.css";
import Strip from "../../assets/urine-strip.jpg";

const AboutStrip = () => {
  return (
    <div className="strip-wrapper">
      <div className="strip-heading">ABOUT URINE STRIP</div>
      <div className="strip-sub-heading">A urine test strip or dipstick is a basic diagnostic tool used to determine pathological changes in a patient's urine in standard urinalysis.The analysis includes testing for the presence of <span> proteins, glucose, ketones, haemoglobin, bilirubin, urobilinogen, acetone, nitrite and leucocytes</span> as well as testing of <span>pH</span>  and specific gravity or to test for infection by different pathogens.</div>
      <div className="strip-section">
        <img src={Strip} alt="" />
      </div>
    </div>
  );
};

export default AboutStrip;
