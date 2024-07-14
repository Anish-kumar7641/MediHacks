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
    const file = e.target.files[0]; // Assumin
    setSelectedImage(file);
  };

  const handleSubmit = async () => {
    // console.log
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
            <button
              className="button-3"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <div className="loader"></div> : "Submit"}
            </button>
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
      </div>
      <Report/>
    </>
  );
};

export default Analyzer;
