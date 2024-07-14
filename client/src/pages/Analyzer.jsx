import React, { useState } from "react";
import "./Analyzer.css";
import Download from "../assets/download.png";
import "react-json-view-lite/dist/index.css";
import Header from "../components/Header/Header";
import Report from "../components/Report/Report";
import Chat from "../assets/chat.png"
import Delete from "../assets/Delete.png"
import { ReportData } from "../assets/data/ReportData";
import ChatBox from "../components/ChatBox/ChatBox";

const Analyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen]= useState(false)
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
      const response = await fetch("https://medihacks-1.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setResponseResult(data);
        const dat =ReportData(data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
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
            </div>
          </div>
        </div>
        {responseResult && <Report responseResult={responseResult}/>}
      </div>
      <div className="chatIcon" onClick={()=>setChatOpen(!chatOpen)}>
            {!chatOpen?(<img src={Chat} alt="chat"/>):(<img src={Delete} alt="cross"/>)}
      </div>
      {chatOpen&&<div className="chatBox">
        <ChatBox/>
      </div>}
    </>
  );
};

export default Analyzer;
