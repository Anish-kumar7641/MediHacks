import React, { useState } from "react";
import "./Analyzer.css";
import Download from "../assets/download.png";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import Header from "../components/Header/Header";
import Report from "../components/Report/Report";

const Analyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle file selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true); // Set loading to true before making the request

    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
      const response = await fetch(
        "https://alemeno-assignment-qd7t.onrender.com/urineStrip/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponseData(data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="bodyContain">
          <div className="leftBody">
            <label htmlFor="uploadInput">
              <img
                className="uploadIcon"
                src={Download}
                alt="Upload Image"
                width="80"
                height="80"
              />
            </label>
            <input
              id="uploadInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <div className="tagline">Upload Your Urine Strip Image</div>
            {selectedImage && (
              <div className="selectedImageName">{selectedImage.name}</div>
            )}
            <div className="buttons">
              <button className="blob-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? <div className="loader"></div> : "SUBMIT"}
                <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                  </span>
                </span>
              </button>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <defs>
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                  <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                </filter>
              </defs>
            </svg>
          </div>
          <div className="rightBody">
            <div className="imgContain">
              {selectedImage ? (
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
              ) : (
                <div className="selectImageText">Select Image for Report</div>
              )}
              {responseData &&
                responseData.rgb_positions &&
                responseData.rgb_positions.map((position, index) => (
                  <div
                    key={index}
                    className="rgbText"
                    style={{
                      top: `${position.coordinates[1] / 3.6}px`,
                      left: `${position.coordinates[0] / 2.1}px`,
                    }}
                  >
                    {`RGB: (${position.rgb.join(", ")})`}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="jsonViewer">
          {responseData && responseData.contour_labels && (
            <JsonView
              data={responseData.contour_labels}
              shouldExpandNode={allExpanded}
              style={darkStyles}
            />
          )}
        </div>
      <Report />
      </div>
    </>
  );
};

export default Analyzer;
